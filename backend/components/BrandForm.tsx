import { useState } from 'react';
import { uploadToCloudinary } from '../lib/clientUpload';
import type { BrandItem, BrandItemInput } from '../lib/types';

interface BrandFormProps {
  initial?: BrandItem;
  saving: boolean;
  onSave: (input: BrandItemInput) => Promise<void> | void;
  onCancel: () => void;
}

export function BrandForm({ initial, saving, onSave, onCancel }: BrandFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [sourceType, setSourceType] = useState<'upload' | 'url'>(
    initial?.logo && !initial.cloudinaryPublicId ? 'url' : 'upload'
  );
  const [logo, setLogo] = useState(initial?.logo ?? '');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState(initial?.cloudinaryPublicId);

  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const onFileChosen = async (file: File) => {
    setFormError(null);
    setUploadPct(0);
    try {
      const result = await uploadToCloudinary(file, 'logo', setUploadPct);
      setLogo(result.secureUrl);
      setCloudinaryPublicId(result.publicId);
    } catch (err: any) {
      setFormError(err?.message ?? 'Upload failed');
    } finally {
      setUploadPct(null);
    }
  };

  const removeLogo = () => {
    setLogo('');
    setCloudinaryPublicId(undefined);
  };

  const canSubmit = name.trim().length > 0 && uploadPct === null && !saving;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setFormError(null);
    try {
      await onSave({
        name: name.trim(),
        logo: logo.trim() || undefined,
        cloudinaryPublicId,
      });
    } catch (err: any) {
      setFormError(err?.message ?? 'Failed to save');
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <div className="field">
        <label>Brand name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="COSRX" />
      </div>

      <div className="tabs">
        <button
          type="button"
          className={sourceType === 'upload' ? 'tab active' : 'tab'}
          onClick={() => setSourceType('upload')}
        >
          Upload a logo
        </button>
        <button
          type="button"
          className={sourceType === 'url' ? 'tab active' : 'tab'}
          onClick={() => setSourceType('url')}
        >
          Paste an image link
        </button>
      </div>

      {logo && (
        <div className="preview">
          <img src={logo} alt="Logo preview" className="preview-img" />
          <button type="button" className="remove" onClick={removeLogo}>
            Remove logo
          </button>
        </div>
      )}

      {sourceType === 'upload' ? (
        <div className="field">
          <label>Logo file (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileChosen(file);
            }}
          />
          {uploadPct !== null && <div className="progress">Uploading… {uploadPct}%</div>}
        </div>
      ) : (
        <div className="field">
          <label>Image URL (optional)</label>
          {/* Plain text input: the original logos use site-relative paths like /logos/cosrx.png. */}
          <input
            type="text"
            placeholder="https://..."
            value={logo}
            onChange={(e) => {
              setLogo(e.target.value);
              setCloudinaryPublicId(undefined);
            }}
          />
        </div>
      )}

      <p className="hint">Brands without a logo show their name in a text pill.</p>

      {formError && <p className="error">{formError}</p>}

      <div className="actions">
        <button type="button" className="secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" disabled={!canSubmit}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      <style jsx>{`
        .form {
          background: white;
          border: 1px solid #e5ddd3;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 18px;
        }
        .tab {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #e5ddd3;
          background: #faf8f5;
          color: #7e6956;
          font-size: 14px;
          cursor: pointer;
        }
        .tab.active {
          background: #c4a88a;
          color: white;
          border-color: #c4a88a;
        }
        .preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }
        .preview-img {
          max-height: 56px;
          max-width: 60%;
          object-fit: contain;
          display: block;
        }
        .remove {
          border: 1px solid #f3d4cf;
          background: #faf8f5;
          color: #c0392b;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          cursor: pointer;
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
        input[type='text'] {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #e5ddd3;
          font-size: 15px;
          box-sizing: border-box;
        }
        input[type='file'] {
          font-size: 14px;
          width: 100%;
        }
        .progress {
          margin-top: 8px;
          font-size: 13px;
          color: #7e6956;
        }
        .hint {
          font-size: 13px;
          color: #9b8b7e;
          margin: 0;
        }
        .error {
          color: #c0392b;
          font-size: 14px;
        }
        .actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .actions button {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          border: none;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }
        .actions button[type='submit'] {
          background: #c4a88a;
          color: white;
        }
        .actions button[type='submit']:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .actions .secondary {
          background: #faf8f5;
          color: #7e6956;
          border: 1px solid #e5ddd3;
        }
      `}</style>
    </form>
  );
}
