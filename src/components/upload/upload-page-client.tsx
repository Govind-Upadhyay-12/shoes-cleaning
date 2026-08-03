"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { UploadZone } from "@/components/upload/upload-zone";
import {
  EMPTY_FOOTWEAR_FORM,
  FootwearDetailsForm,
  type FootwearFormState,
} from "@/components/upload/footwear-details-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { setPendingUpload } from "@/lib/upload-store";
import type { UploadSlot, UploadedImage } from "@/types";
import { cn } from "@/lib/utils";

export function UploadPageClient() {
  const router = useRouter();
  const [images, setImages] = useState<Partial<Record<UploadSlot, UploadedImage>>>(
    {}
  );
  const [details, setDetails] = useState<FootwearFormState>(EMPTY_FOOTWEAR_FORM);
  const [error, setError] = useState<string | null>(null);

  const files = useMemo(
    () =>
      (["front", "side", "sole"] as UploadSlot[])
        .map((slot) => images[slot]?.file)
        .filter((file): file is File => Boolean(file)),
    [images]
  );

  const detailsReady =
    Boolean(details.shoe_type) &&
    Boolean(details.material) &&
    Boolean(details.primary_color) &&
    Boolean(details.dirt_level) &&
    details.stains.length > 0;

  const ready = files.length === 3 && detailsReady;

  function onGetEstimate() {
    if (files.length !== 3) {
      setError("Add Front, Side, and Sole photos.");
      return;
    }
    if (!detailsReady) {
      setError("Fill all footwear details below.");
      return;
    }

    setError(null);
    const preview = images.front?.previewUrl || images.side?.previewUrl || null;
    setPendingUpload(files, preview, {
      shoe_type: details.shoe_type,
      brand: details.brand || null,
      material: details.material,
      primary_color: details.primary_color,
      dirt_level: details.dirt_level,
      stains: details.stains,
      visible_damage: details.visible_damage,
      imageCount: 3,
    });
    router.push("/analyze");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Book cleaning</h1>
      <p className="mt-2 text-muted-foreground">
        Add 3 photos and a few details. Get price + delivery time instantly.
      </p>

      <div className="mt-8">
        <UploadZone images={images} onChange={setImages} error={null} />
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-base font-semibold">Details</h2>
        <FootwearDetailsForm value={details} onChange={setDetails} />
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="sticky bottom-4 mt-8 space-y-2">
        <Button
          size="lg"
          className="h-12 w-full rounded-full text-base"
          disabled={!ready}
          onClick={onGetEstimate}
        >
          Get price &amp; time
        </Button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex h-11 w-full items-center justify-center rounded-full"
          )}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
