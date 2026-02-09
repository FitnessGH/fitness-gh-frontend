'use client';

import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@ui/button';
import { cn } from '@/lib/utils';
import UploadAPI from '@/lib/api/upload';

interface ImageUploadProps {
  value?: string | string[];
  onChange: (urls: string | string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  multiple = false,
  maxFiles = 5,
  maxSize = 5,
  accept = 'image/*',
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, boolean>>({});

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter((file) => {
        if (file.size > maxSize * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const totalFiles = previewUrls.length + validFiles.length;
      if (totalFiles > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed.`);
        return;
      }

      setUploading(true);

      // Create preview URLs for immediate feedback
      const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
      const updatedPreviewUrls = [...previewUrls, ...newPreviewUrls];
      setPreviewUrls(updatedPreviewUrls);

      try {
        // Upload files to Vercel Blob Storage
        const uploadPromises = validFiles.map(async (file, index) => {
          const fileIndex = previewUrls.length + index;
          setUploadProgress((prev) => ({ ...prev, [fileIndex]: true }));

          try {
            const url = await UploadAPI.uploadImage(file);
            setUploadProgress((prev) => ({ ...prev, [fileIndex]: false }));
            return url;
          } catch (error) {
            setUploadProgress((prev) => ({ ...prev, [fileIndex]: false }));
            console.error(`Error uploading file ${file.name}:`, error);
            throw error;
          }
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        const finalUrls = [...previewUrls, ...uploadedUrls];

        // Clean up preview URLs
        newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));

        if (multiple) {
          onChange(finalUrls);
        } else {
          onChange(finalUrls[finalUrls.length - 1] || '');
        }
      } catch (error: any) {
        console.error('Error uploading images:', error);
        alert(error.message || 'Failed to upload images');
        // Remove failed previews
        setPreviewUrls(previewUrls);
      } finally {
        setUploading(false);
        setUploadProgress({});
      }
    },
    [previewUrls, maxSize, maxFiles, multiple, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles],
  );

  const removeImage = useCallback(
    (index: number) => {
      const updated = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(updated);
      if (multiple) {
        onChange(updated);
      } else {
        onChange(updated[0] || '');
      }
    },
    [previewUrls, multiple, onChange],
  );

  return (
    <div className={cn('space-y-4', className)}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50',
          uploading && 'opacity-50 pointer-events-none',
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          id="image-upload-input"
          disabled={uploading}
        />
        <label
          htmlFor="image-upload-input"
          className="cursor-pointer block"
        >
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Uploading to Vercel Blob...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {isDragging
                      ? 'Drop images here'
                      : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {multiple
                      ? `PNG, JPG up to ${maxSize}MB (max ${maxFiles} files)`
                      : `PNG, JPG up to ${maxSize}MB`}
                  </p>
                </div>
              </>
            )}
          </div>
        </label>
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-border"
            >
              {uploadProgress[index] && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                disabled={uploadProgress[index]}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
