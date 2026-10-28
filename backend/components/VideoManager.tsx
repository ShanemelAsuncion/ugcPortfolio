import { useCallback, useEffect, useMemo, useState } from 'react';
import { ItemForm } from './ItemForm';
import type { PortfolioItem, PortfolioItemInput } from '../lib/types';

type Mode = { kind: 'idle' } | { kind: 'new' } | { kind: 'edit'; id: string };

export function VideoManager() {
  const [items, setItems] = useState<PortfolioItem[] | null>(null);
  const [mode, setMode] = useState<Mode>({ kind: 'idle' });
  const [saving, setSaving] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    const res = await fetch('/api/admin/items');
    if (!res.ok) {
      setListError('Failed to load videos.');
      return;
    }
    const data = await res.json();
    setItems(data.items);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const existingTags = useMemo(() => {
    const set = new Set<string>();
    (items ?? []).forEach((item) => item.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [items]);

  const createItem = async (input: PortfolioItemInput) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message ?? 'Failed to save');
      const data = await res.json();
      setItems(data.items);
      setMode({ kind: 'idle' });
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (id: string, input: PortfolioItemInput) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message ?? 'Failed to save');
      const data = await res.json();
      setItems(data.items);
      setMode({ kind: 'idle' });
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm('Delete this video? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/items/${id}`, { method: 'DELETE' });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items);
    } else {
      setListError('Failed to delete video.');
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    if (!items) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const next = [...items];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setItems(next);
    await fetch('/api/admin/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection: 'videos', orderedIds: next.map((i) => i.id) }),
    });
  };

  if (items === null) {
    return <p className="status">Loading videos…</p>;
  }

  return (
    <div>
      {listError && <p className="error">{listError}</p>}

      {mode.kind === 'idle' && (
        <button className="add-btn" onClick={() => setMode({ kind: 'new' })}>
          + Add new video
        </button>
      )}

      {mode.kind === 'new' && (
        <ItemForm existingTags={existingTags} saving={saving} onCancel={() => setMode({ kind: 'idle' })} onSave={createItem} />
      )}

      <ul className="list">
        {items.map((item, index) => (
          <li key={item.id}>
            {mode.kind === 'edit' && mode.id === item.id ? (
              <ItemForm
                initial={item}
                existingTags={existingTags}
                saving={saving}
                onCancel={() => setMode({ kind: 'idle' })}
                onSave={(input) => updateItem(item.id, input)}
              />
            ) : (
              <div className="card">
                <img src={item.thumbnail} alt={item.title} className="thumb" />
                <div className="info">
                  <h3>{item.title}</h3>
                  <p className="meta">{item.tags.join(' · ')}</p>
                  <p className="format">{item.format}</p>
                  <span className={`badge ${item.type}`}>{item.type === 'upload' ? 'Uploaded' : 'Link'}</span>
                </div>
                <div className="controls">
                  <div className="reorder">
                    <button onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up">
                      ↑
                    </button>
                    <button onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down">
                      ↓
                    </button>
                  </div>
                  <button className="edit" onClick={() => setMode({ kind: 'edit', id: item.id })}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => deleteItem(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .status {
          color: #7e6956;
        }
        .error {
          color: #c0392b;
          margin-bottom: 12px;
        }
        .add-btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: 2px dashed #c4a88a;
          background: white;
          color: #7e6956;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .card {
          display: flex;
          gap: 14px;
          background: white;
          border: 1px solid #e5ddd3;
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 14px;
          align-items: flex-start;
        }
        .thumb {
          width: 72px;
          height: 72px;
          border-radius: 10px;
          object-fit: cover;
          flex-shrink: 0;
          background: #221d17;
        }
        .info {
          flex: 1;
          min-width: 0;
        }
        .info h3 {
          margin: 0 0 4px;
          font-size: 15px;
          color: #221d17;
        }
        .meta {
          margin: 0 0 2px;
          font-size: 12px;
          color: #9b8b7e;
        }
        .format {
          margin: 0 0 6px;
          font-size: 12px;
          color: #b8a08d;
          font-style: italic;
        }
        .badge {
          display: inline-block;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 999px;
          background: #faf0e6;
          color: #7e6956;
        }
        .badge.upload {
          background: #e8f3ea;
          color: #3c7a52;
        }
        .controls {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-shrink: 0;
        }
        .reorder {
          display: flex;
          gap: 4px;
        }
        .reorder button,
        .edit,
        .delete {
          border: 1px solid #e5ddd3;
          background: #faf8f5;
          color: #7e6956;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          cursor: pointer;
        }
        .reorder button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .delete {
          color: #c0392b;
          border-color: #f3d4cf;
        }
      `}</style>
    </div>
  );
}
