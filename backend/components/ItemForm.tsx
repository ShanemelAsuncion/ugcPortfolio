import { useRef, useState } from 'react';
import { uploadToCloudinary } from '../lib/clientUpload';
import type { PortfolioItem, PortfolioItemInput } from '../lib/types';

interface ItemFormProps {
  initial?: PortfolioItem;
  existingTags: string[];
  saving: boolean;
  onSave: (input: PortfolioItemInput) => Promise<void> | void;
  onCancel: () => void;
}

export function ItemForm({ initial, existingTags, saving, onSave, onCancel }: ItemFormProps) {
  const [sourceType, setSourceType] = useState<'upload' | 'url'>(initial?.type ?? 'upload');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [format, setFormat] = useState(initial?.format ?? '');
  const [tagsText, setTagsText] = useState(initial?.tags.join(', ') ?? '');
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? '');
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? '');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState(initial?.cloudinaryPublicId);

  const [videoUploadPct, setVideoUploadPct] = useState<number | null>(null);
  const [thumbUploadPct, setThumbUploadPct] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const selectedTags = tagsText
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setTagsText(selectedTags.filter((t) => t !== tag).join(', '));
    } else {
      setTagsText([...selectedTags, tag].join(', '));
    }
  };

  const onVideoFileChosen = async (file: File) => {
    setFormError(null);
    setVideoUploadPct(0);
    try {
      const result = await uploadToCloudinary(file, 'video', setVideoUploadPct);
      setVideoUrl(result.secureUrl);
      setCloudinaryPublicId(result.publicId);
      if (result.thumbnailUrl) setThumbnail(result.thumbnailUrl);
    } catch (err: any) {
      setFormError(err?.message ?? 'Video upload failed');
    } finally {
      setVideoUploadPct(null);
    }
  };

  const onThumbFileChosen = async (file: File) => {
    setFormError(null);
    setThumbUploadPct(0);
    try {
      const result = await uploadToCloudinary(file, 'thumbnail', setThumbUploadPct);
      setThumbnail(result.secureUrl);
    } catch (err: any) {
      setFormError(err?.message ?? 'Thumbnail upload failed');
    } finally {
      setThumbUploadPct(null);
    }
  };

  const canSubmit =
    title.trim().length > 0 &&
    thumbnail.trim().length > 0 &&
    videoUrl.trim().length > 0 &&
    videoUploadPct === null &&
    thumbUploadPct === null &&
    !saving;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setFormError(null);
    await onSave({
      title: title.trim(),
      tags: selectedTags,
      format: format.trim(),
      thumbnail: thumbnail.trim(),
      videoUrl: videoUrl.trim(),
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
          Upload a video
        </button>
        <button
          type="button"
          className={sourceType === 'url' ? 'tab active' : 'tab'}
          onClick={() => setSourceType('url')}
        >
          Paste a video link
        </button>
      </div>

      {sourceType === 'upload' ? (
        <div className="field">
          <label>Video file</label>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onVideoFileChosen(file);
            }}
          />
          {videoUploadPct !== null && <div className="progress">Uploading… {videoUploadPct}%</div>}
          {videoUrl && videoUploadPct === null && sourceType === 'upload' && (
            <video src={videoUrl} className="preview-video" controls />
          )}
        </div>
      ) : (
        <div className="field">
          <label>Video URL (YouTube, Instagram, TikTok, Vimeo)</label>
          <input
            type="url"
            placeholder="https://youtube.com/shorts/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
      )}

      <div className="field">
        <label>Thumbnail</label>
        {thumbnail && <img src={thumbnail} alt="Thumbnail preview" className="preview-thumb" />}
        <div className="thumb-row">
          <input
            type="text"
            placeholder="Thumbnail image URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
          <button type="button" onClick={() => thumbInputRef.current?.click()}>
            Upload image
          </button>
          <input
            ref={thumbInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onThumbFileChosen(file);
            }}
          />
        </div>
        {thumbUploadPct !== null && <div className="progress">Uploading… {thumbUploadPct}%</div>}
      </div>

      <div className="field">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The ... Routine" />
      </div>

      <div className="field">
        <label>Format</label>
        <input
          type="text"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          placeholder="Authentic Product Demo"
        />
      </div>

      <div className="field">
        <label>Tags</label>
        <input
          type="text"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="Skincare, Wellness"
        />
        {existingTags.length > 0 && (
          <div className="tag-chips">
            {existingTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className={selectedTags.includes(tag) ? 'chip active' : 'chip'}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
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
        .thumb-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .thumb-row input {
          flex: 1;
        }
        .thumb-row button {
          white-space: nowrap;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #c4a88a;
          background: white;
          color: #7e6956;
          font-size: 13px;
          cursor: pointer;
        }
        .preview-thumb {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 10px;
          display: block;
        }
        .preview-video {
          width: 100%;
          max-height: 220px;
          border-radius: 10px;
          margin-top: 10px;
          background: black;
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
