"use client";

import * as React from "react";

type FileUploaderProps = {
  onFilesSelected?: (files: File[]) => void;
};

const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes)) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

export function FileUploader({ onFilesSelected }: FileUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const acceptFiles = React.useCallback(
    (incoming: File[]) => {
      const accepted = incoming.filter((f) => ACCEPTED_TYPES.has(f.type));
      const rejected = incoming.filter((f) => !ACCEPTED_TYPES.has(f.type));

      if (rejected.length > 0) {
        setError("Some files were rejected. Please upload PDF/JPG/PNG/WEBP.");
      } else {
        setError(null);
      }

      if (accepted.length === 0) return;

      setFiles((prev) => {
        const next = [...prev, ...accepted];
        onFilesSelected?.(next);
        return next;
      });
    },
    [onFilesSelected],
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    acceptFiles(Array.from(e.dataTransfer.files ?? []));
  };

  const onBrowse = () => inputRef.current?.click();

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        onClick={onBrowse}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onBrowse();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={onDrop}
        className={[
          "flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition",
          isDragging
            ? "border-purple-400 bg-purple-50"
            : "border-purple-200 bg-white hover:bg-purple-50/40",
        ].join(" ")}
        aria-label="Upload receipts by dragging and dropping files"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
          <span className="text-xl leading-none">↑</span>
        </div>
        <p className="mt-3 text-sm font-medium text-zinc-900">
          Drag & drop receipts here
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          or click to browse (PDF, JPG, PNG, WEBP)
        </p>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
          onChange={(e) => {
            acceptFiles(Array.from(e.target.files ?? []));
            // allow re-uploading the same file
            e.currentTarget.value = "";
          }}
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-xs text-purple-800">
          {error}
        </div>
      ) : null}

      {files.length > 0 ? (
        <div className="rounded-xl border border-purple-100 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-zinc-900">
              Selected receipts
            </p>
            <button
              type="button"
              className="text-xs font-medium text-purple-700 hover:text-purple-800"
              onClick={() => {
                setFiles([]);
                onFilesSelected?.([]);
                setError(null);
              }}
            >
              Clear
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {files.map((f, idx) => (
              <li
                key={`${f.name}-${f.size}-${idx}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-purple-100 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-zinc-900">{f.name}</p>
                  <p className="text-xs text-zinc-600">{formatBytes(f.size)}</p>
                </div>
                <span className="rounded-full bg-purple-100 px-2 py-1 text-[11px] font-medium text-purple-800">
                  Ready
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
