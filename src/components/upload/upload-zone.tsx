"use client";

import { useCallback } from "react";
import { Camera, ImagePlus, Trash2, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { ACCEPTED_TYPES, MAX_FILE_SIZE, UPLOAD_SLOTS } from "@/constants";
import type { UploadSlot, UploadedImage } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  images: Partial<Record<UploadSlot, UploadedImage>>;
  onChange: (images: Partial<Record<UploadSlot, UploadedImage>>) => void;
  error?: string | null;
};

export function UploadZone({ images, onChange, error }: Props) {
  const setFile = useCallback(
    (slot: UploadSlot, file: File | null) => {
      if (!file) {
        const next = { ...images };
        if (next[slot]?.previewUrl) URL.revokeObjectURL(next[slot]!.previewUrl);
        delete next[slot];
        onChange(next);
        return;
      }

      if (!ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) {
        return;
      }

      const existing = images[slot];
      if (existing?.previewUrl) URL.revokeObjectURL(existing.previewUrl);

      onChange({
        ...images,
        [slot]: {
          slot,
          file,
          previewUrl: URL.createObjectURL(file),
          name: file.name,
        },
      });
    },
    [images, onChange]
  );

  return (
    <div className="space-y-3">
      {UPLOAD_SLOTS.map((slot, index) => {
        const current = images[slot.id];
        return (
          <motion.label
            key={slot.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex min-h-[88px] cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-border bg-white p-3 active:scale-[0.99]",
              current && "border-solid border-primary/40 bg-accent/40"
            )}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) setFile(slot.id, file);
            }}
          >
            <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary">
              {current ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={current.previewUrl}
                  alt={slot.label}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Upload className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{slot.label}</p>
              <p className="truncate text-xs text-muted-foreground">
                {current?.name || slot.hint}
              </p>
              <div className="mt-2 flex gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                  <Camera className="h-3 w-3" /> Camera
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                  <ImagePlus className="h-3 w-3" /> Gallery
                </span>
              </div>
            </div>
            {current && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFile(slot.id, null);
                }}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              className="sr-only"
              onChange={(e) => setFile(slot.id, e.target.files?.[0] ?? null)}
            />
          </motion.label>
        );
      })}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
