import type { ShoeAnalysis } from "@/types";
import type { EstimateInput } from "@/lib/estimate-rules";

export async function createEstimate(
  details: EstimateInput & { imageCount?: number }
): Promise<ShoeAnalysis> {
  const response = await fetch("/api/estimate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to create estimate");
  }

  return data as ShoeAnalysis;
}
