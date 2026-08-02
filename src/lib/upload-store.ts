let pendingFiles: File[] = [];
let pendingPreview: string | null = null;
let pendingDetails: Record<string, unknown> | null = null;

export function setPendingUpload(
  files: File[],
  preview?: string | null,
  details?: Record<string, unknown> | null
) {
  pendingFiles = files;
  pendingPreview = preview ?? null;
  pendingDetails = details ?? null;
}

export function getPendingUpload() {
  return {
    files: pendingFiles,
    preview: pendingPreview,
    details: pendingDetails,
  };
}

export function clearPendingUpload() {
  pendingFiles = [];
  pendingPreview = null;
  pendingDetails = null;
}
