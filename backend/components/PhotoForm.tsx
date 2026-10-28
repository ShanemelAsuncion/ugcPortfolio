import { useRef, useState } from 'react';
import { uploadToCloudinary } from '../lib/clientUpload';
import type { PhotoItem, PhotoItemInput } from '../lib/types';

interface PhotoFormProps {
  initial?: PhotoItem;
  existingCategories: string[];
  saving: boolean;
  onSave: (input: PhotoItemInput) => Promise<void> | void;
  onCancel: () => void;
}

export function PhotoForm({ initial, existingCategories, saving, onSave, onCancel }: PhotoFormProps) {
  const [sourceType, setSourceType] = useState<'upload' | 'url'>(initial?.type ?? 'upload');
  const [url, setUrl] = useState(initial?.url ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState(initial?.cloudinaryPublicId);

  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChosen = async (file: File) => {
    setFormError(null);
    setUploadPct(0);
    try {
      const result = await uploadToCloudinary(file, 'photo', setUploadPct);
      setUrl(result.secureUrl);
      setCloudinaryPublicId(result.publicId);
    } catch (err: any) {
      setFormError(err?.message ?? 'Upload failed');
    } finally {
      setUploadPct(null);
    }
  };

  const canSubmit = url.trim().length > 0 && category.trim().length > 0 && uploadPct === null && !saving;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setFormError(null);
    await onSave({
      url: url.trim(),
      category: category.trim(),
      description: description.trim(),
      type: sourceType,
      cloudinaryPublicId: sourceType === 'upload' ? cloudinaryPublicId : undefined,
    });
  };

  return (
    <form onSubmit={submit} className="form">
      <div className="tabs">
        <button
          type="button"
          className={sourceType === 'upload' ? 'tab active' : 'tab'}
          onClick={() => setSourceType('upload')}
        >
          Upload a photo
        </button>
        <button
          type="button"
          className={sourceType === 'url' ? 'tab active' : 'tab'}
          onClick={() => setSourceType('url')}
        >
          Paste an image link
        </button>
      </div>

      {url && <img src={url} alt="Photo preview" className="preview-img" />}

      {sourceType === 'upload' ? (
        <div className="field">
          <label>Photo file</label>
          <input
            ref={fileInputRef}
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
          <label>Image URL</label>
          <input
            type="url"
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      )}

      <div className="field">
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Skincare"
        />
        {existingCategories.length > 0 && (
          <div className="tag-chips">
            {existingCategories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={category === cat ? 'chip active' : 'chip'}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="field">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Flatlay"
        />
      </div>

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
        .preview-img {
          width: 100%;
          max-height: 220px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 16px;
          display: block;
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
        input[type='text'],
        input[type='url'] {
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
        .tag-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .chip {
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid #e5ddd3;
          background: white;
          color: #7e6956;
          font-size: 12px;
          cursor: pointer;
        }
        .chip.active {
          background: #c4a88a;
          color: white;
          border-color: #c4a88a;
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
