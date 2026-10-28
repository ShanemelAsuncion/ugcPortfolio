import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? 'Login failed');
        return;
      }
      router.push('/admin');
    } catch {
      setError('Could not reach the server. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="wrap">
        <form onSubmit={onSubmit} className="card">
          <h1>Portfolio Admin</h1>
          <p className="hint">Enter the admin password to manage videos.</p>
          <input
            type="password"
            inputMode="text"
            autoFocus
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={isSubmitting || password.length === 0}>
            {isSubmitting ? 'Checking…' : 'Log in'}
          </button>
        </form>
      </div>
      <style jsx>{`
        .wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf8f5;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .card {
          width: 100%;
          max-width: 360px;
          background: white;
          border-radius: 16px;
          padding: 32px 24px;
          box-shadow: 0 10px 30px rgba(126, 105, 86, 0.12);
        }
        h1 {
          margin: 0 0 8px;
          font-size: 22px;
          color: #221d17;
        }
        .hint {
          margin: 0 0 20px;
          color: #9b8b7e;
          font-size: 14px;
        }
        input {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid #e5ddd3;
          font-size: 16px;
          margin-bottom: 12px;
          box-sizing: border-box;
        }
        input:focus {
          outline: none;
          border-color: #c4a88a;
        }
        button {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: #c4a88a;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .error {
          color: #c0392b;
          font-size: 14px;
          margin: -4px 0 12px;
        }
      `}</style>
    </>
  );
}
