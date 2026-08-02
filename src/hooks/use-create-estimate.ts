"use client";

import { useMutation } from "@tanstack/react-query";
import { createEstimate } from "@/services/estimate";
import type { EstimateInput } from "@/lib/estimate-rules";

export function useCreateEstimate() {
  return useMutation({
    mutationFn: (details: EstimateInput & { imageCount?: number }) =>
      createEstimate(details),
  });
}
