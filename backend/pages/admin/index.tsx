import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { VideoManager } from '../../components/VideoManager';
import { PhotoManager } from '../../components/PhotoManager';
import { BrandManager } from '../../components/BrandManager';
import { StatsManager } from '../../components/StatsManager';

type Tab = 'videos' | 'photos' | 'brands' | 'stats';

export default function AdminDashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState<Tab>('videos');

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/session');
      const data = await res.json();
      if (!data.authenticated) {
        router.replace('/admin/login');
        return;
      }
      setAuthChecked(true);
    })();
  }, [router]);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  if (!authChecked) {
    return (
      <div className="loading">
        Loading…
        <style jsx>{`
          .loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: #7e6956;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Portfolio Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="page">
        <header>
          <h1>Portfolio Admin</h1>
          <button className="logout" onClick={logout}>
            Log out
          </button>
        </header>

        <div className="tabs">
          <button className={tab === 'videos' ? 'tab active' : 'tab'} onClick={() => setTab('videos')}>
            Videos
          </button>
          <button className={tab === 'photos' ? 'tab active' : 'tab'} onClick={() => setTab('photos')}>
            Photos
          </button>
          <button className={tab === 'brands' ? 'tab active' : 'tab'} onClick={() => setTab('brands')}>
            Brands
          </button>
          <button className={tab === 'stats' ? 'tab active' : 'tab'} onClick={() => setTab('stats')}>
            Stats
          </button>
        </div>

        {tab === 'videos' && <VideoManager />}
        {tab === 'photos' && <PhotoManager />}
        {tab === 'brands' && <BrandManager />}
        {tab === 'stats' && <StatsManager />}
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #faf8f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 20px 16px 60px;
          max-width: 720px;
          margin: 0 auto;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 22px;
          color: #221d17;
          margin: 0;
        }
        .logout {
          background: none;
          border: 1px solid #e5ddd3;
          border-radius: 8px;
          padding: 8px 14px;
          color: #7e6956;
          font-size: 13px;
          cursor: pointer;
        }
        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          background: white;
          border: 1px solid #e5ddd3;
          border-radius: 12px;
          padding: 4px;
        }
        .tab {
          flex: 1;
          padding: 10px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #7e6956;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .tab.active {
          background: #c4a88a;
          color: white;
        }
      `}</style>
    </>
  );
}
