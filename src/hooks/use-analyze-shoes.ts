"use client";

import { useMutation } from "@tanstack/react-query";
import { analyzeShoes } from "@/services/analyze";

export function useAnalyzeShoes() {
  return useMutation({
    mutationFn: (files: File[]) => analyzeShoes(files),
  });
}
