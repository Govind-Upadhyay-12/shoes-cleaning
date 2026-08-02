"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnalysisLoader } from "@/components/analysis/loader";
import { useCreateEstimate } from "@/hooks/use-create-estimate";
import { clearPendingUpload, getPendingUpload } from "@/lib/upload-store";
import type { EstimateInput } from "@/lib/estimate-rules";
import { saveAnalysis } from "@/utils/storage";

export function AnalyzePageClient() {
  const router = useRouter();
  const { mutateAsync } = useCreateEstimate();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const { files, preview, details } = getPendingUpload();
    if (!details || !files.length) {
      router.replace("/upload");
      return;
    }

    mutateAsync({
      ...(details as EstimateInput),
      imageCount: files.length,
    })
      .then((result) => {
        saveAnalysis(result, preview || undefined);
        clearPendingUpload();
        router.replace("/result");
      })
      .catch(() => {
        clearPendingUpload();
        router.replace("/upload");
      });
  }, [mutateAsync, router]);

  return <AnalysisLoader />;
}
