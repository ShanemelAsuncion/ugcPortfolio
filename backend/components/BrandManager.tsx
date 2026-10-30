import { useCallback, useEffect, useState } from 'react';
import { BrandForm } from './BrandForm';
import type { BrandItem, BrandItemInput } from '../lib/types';

type Mode = { kind: 'idle' } | { kind: 'new' } | { kind: 'edit'; id: string };

export function BrandManager() {
  const [items, setItems] = useState<BrandItem[] | null>(null);
  const [mode, setMode] = useState<Mode>({ kind: 'idle' });
  const [saving, setSaving] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    const res = await fetch('/api/admin/brands');
    if (!res.ok) {
      setListError('Failed to load brands.');
      return;
    }
    const data = await res.json();
    setItems(data.items);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const createItem = async (input: BrandItemInput) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/brands', {
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

  const updateItem = async (id: string, input: BrandItemInput) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/brands/${id}`, {
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

  const deleteItem = async (item: BrandItem) => {
    if (!window.confirm(`Delete ${item.name}? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/brands/${item.id}`, { method: 'DELETE' });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items);
    } else {
      setListError('Failed to delete brand.');
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
      body: JSON.stringify({ collection: 'brands', orderedIds: next.map((i) => i.id) }),
    });
  };

  if (items === null) {
    return <p className="status">{listError ?? 'Loading brands…'}</p>;
  }

  return (
    <div>
      {listError && <p className="error">{listError}</p>}

      {mode.kind === 'idle' && (
        <button className="add-btn" onClick={() => setMode({ kind: 'new' })}>
          + Add new brand
        </button>
      )}

      {mode.kind === 'new' && (
        <BrandForm saving={saving} onCancel={() => setMode({ kind: 'idle' })} onSave={createItem} />
      )}

      <ul className="list">
        {items.map((item, index) => (
          <li key={item.id}>
            {mode.kind === 'edit' && mode.id === item.id ? (
              <BrandForm
                initial={item}
                saving={saving}
                onCancel={() => setMode({ kind: 'idle' })}
                onSave={(input) => updateItem(item.id, input)}
              />
            ) : (
              <div className="card">
                <div className="thumb">{item.logo ? <img src={item.logo} alt={item.name} /> : <span>No logo</span>}</div>
                <div className="info">
                  <h3>{item.name}</h3>
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
                  <button className="delete" onClick={() => deleteItem(item)}>
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
          align-items: center;
        }
        .thumb {
          width: 96px;
          height: 56px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #9b8b7e;
        }
        .thumb img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .info {
          flex: 1;
          min-width: 0;
        }
        .info h3 {
          margin: 0;
          font-size: 15px;
          color: #221d17;
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
