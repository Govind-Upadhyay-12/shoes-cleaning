import type { ShoeAnalysis } from "@/types";

export async function analyzeShoes(files: File[]): Promise<ShoeAnalysis> {
  const formData = new FormData();
  for (const file of files) {
    formData.append("images", file);
  }

  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to analyze footwear");
  }

  return data as ShoeAnalysis;
}
