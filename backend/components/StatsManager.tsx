import { useEffect, useState } from 'react';
import type { SiteStats } from '../lib/types';

export function StatsManager() {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [totalReach, setTotalReach] = useState('');
  const [brands, setBrands] = useState('');
  const [videosDelivered, setVideosDelivered] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load'))))
      .then((data: SiteStats) => {
        setStats(data);
        setTotalReach(data.totalReach);
        setBrands(data.brands);
        setVideosDelivered(data.videosDelivered);
      })
      .catch(() => setError('Failed to load stats.'));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalReach, brands, videosDelivered }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message ?? 'Failed to save');
      const data = await res.json();
      setStats(data);
      setSavedAt(Date.now());
    } catch (err: any) {
      setError(err?.message ?? 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (!stats) {
    return <p className="status">Loading stats…</p>;
  }

  return (
    <form onSubmit={submit} className="form">
      <p className="hint">
        These numbers are self-reported — type whatever you currently say in your Instagram bio. They show up in the
        Hero section stats strip on the live site as soon as you save.
      </p>

      <div className="field">
        <label>Total Reach</label>
        <input type="text" value={totalReach} onChange={(e) => setTotalReach(e.target.value)} placeholder="8.3k" />
      </div>

      <div className="field">
        <label>Brands</label>
        <input type="text" value={brands} onChange={(e) => setBrands(e.target.value)} placeholder="50+" />
      </div>

      <div className="field">
        <label>Videos Delivered</label>
        <input
          type="text"
          value={videosDelivered}
          onChange={(e) => setVideosDelivered(e.target.value)}
          placeholder="70+"
        />
      </div>

      {error && <p className="error">{error}</p>}
      {savedAt && !error && <p className="success">Saved.</p>}

      <button type="submit" disabled={saving}>
        {saving ? 'Saving…' : 'Save'}
      </button>

      <style jsx>{`
        .status {
          color: #7e6956;
        }
        .form {
          background: white;
          border: 1px solid #e5ddd3;
          border-radius: 14px;
          padding: 20px;
        }
        .hint {
          font-size: 13px;
          color: #9b8b7e;
          margin: 0 0 18px;
        }
        .field {
          margin-bottom: 16px;
        }
        label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #7e6956;
          margin-bottom: 6px;
        }
        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #e5ddd3;
          font-size: 15px;
          box-sizing: border-box;
        }
        .error {
          color: #c0392b;
          font-size: 14px;
        }
        .success {
          color: #3c7a52;
          font-size: 14px;
        }
        button {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #c4a88a;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 6px;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
}
