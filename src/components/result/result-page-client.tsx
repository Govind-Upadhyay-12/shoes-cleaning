"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PriceCard, ResultCard } from "@/components/result/result-cards";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ShoeAnalysis } from "@/types";
import { buildQuote } from "@/utils/pricing";
import { clearAnalysis, loadAnalysis, loadPreview } from "@/utils/storage";
import { cn } from "@/lib/utils";

export function ResultPageClient() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<ShoeAnalysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const data = loadAnalysis();
    if (!data) {
      router.replace("/upload");
      return;
    }
    setAnalysis(data);
    setPreview(loadPreview());
  }, [router]);

  const quote = useMemo(
    () => (analysis ? buildQuote(analysis) : null),
    [analysis]
  );

  if (!analysis || !quote) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading estimate...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Your estimate</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Ready in {quote.deliveryLabel.toLowerCase()}
        </h1>
      </div>

      <div className="space-y-4">
        <ResultCard analysis={analysis} quote={quote} previewImage={preview} />
        <PriceCard quote={quote} />
      </div>

      <div className="sticky bottom-4 mt-8 space-y-3">
        <Link
          href="/pickup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 w-full rounded-full text-base"
          )}
        >
          Book Pickup · Pay after clean
        </Link>
        <Button
          variant="outline"
          className="h-12 w-full rounded-full"
          onClick={() => {
            clearAnalysis();
            router.push("/upload");
          }}
        >
          Analyze Again
        </Button>
      </div>
    </div>
  );
}
