"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { NewUserCouponBanner } from "@/components/result/new-user-coupon-banner";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ShoeAnalysis } from "@/types";
import {
  applyNewUserCoupon,
  buildQuote,
  displayShoeTitle,
  formatINR,
  stripCoupon,
} from "@/utils/pricing";
import {
  clearAnalysis,
  loadAnalysis,
  loadCouponApplied,
  loadPreview,
  saveCouponApplied,
} from "@/utils/storage";
import { cn } from "@/lib/utils";

export function ResultPageClient() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<ShoeAnalysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [eligible, setEligible] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [eligibilityLoaded, setEligibilityLoaded] = useState(false);

  useEffect(() => {
    const data = loadAnalysis();
    if (!data) {
      router.replace("/upload");
      return;
    }
    setAnalysis(data);
    setPreview(loadPreview());
    setCouponApplied(loadCouponApplied());
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    async function checkEligibility() {
      try {
        const response = await fetch("/api/coupon/eligibility");
        const data = await response.json();
        if (cancelled) return;
        if (response.ok && data.eligible) {
          setEligible(true);
        } else {
          setEligible(false);
          if (loadCouponApplied()) {
            saveCouponApplied(false);
            setCouponApplied(false);
          }
        }
      } catch {
        if (!cancelled) setEligible(false);
      } finally {
        if (!cancelled) setEligibilityLoaded(true);
      }
    }

    checkEligibility();
    return () => {
      cancelled = true;
    };
  }, []);

  const baseQuote = useMemo(
    () => (analysis ? buildQuote(analysis) : null),
    [analysis]
  );

  const quote = useMemo(() => {
    if (!baseQuote) return null;
    if (couponApplied && eligible) return applyNewUserCoupon(baseQuote);
    return stripCoupon(baseQuote);
  }, [baseQuote, couponApplied, eligible]);

  function handleApply() {
    setCouponApplied(true);
    saveCouponApplied(true);
  }

  function handleRemove() {
    setCouponApplied(false);
    saveCouponApplied(false);
  }

  if (!analysis || !quote) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Your estimate</h1>
      <p className="mt-2 text-muted-foreground">
        Simple price. Clear delivery time.
      </p>

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt={displayShoeTitle(analysis)}
          className="mt-8 aspect-[4/3] w-full rounded-3xl object-cover"
        />
      )}

      <div className="mt-8 space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Footwear</p>
          <p className="mt-1 text-xl font-semibold">
            {displayShoeTitle(analysis)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Service</p>
          <p className="mt-1 text-xl font-semibold">
            {analysis.recommended_service}
          </p>
        </div>

        {eligibilityLoaded && (
          <NewUserCouponBanner
            eligible={eligible}
            applied={couponApplied}
            originalPrice={baseQuote?.originalPrice ?? baseQuote?.price ?? null}
            discountedPrice={
              eligible && baseQuote
                ? applyNewUserCoupon(baseQuote).price
                : quote.price
            }
            onApply={handleApply}
            onRemove={handleRemove}
          />
        )}

        <div className="flex items-end justify-between gap-4 border-t border-border pt-5">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="mt-1 text-3xl font-semibold">
              {formatINR(quote.price)}
            </p>
            {quote.couponApplied && quote.originalPrice != null && (
              <p className="mt-0.5 text-sm text-muted-foreground line-through">
                {formatINR(quote.originalPrice)}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Ready by</p>
            <p className="mt-1 text-lg font-semibold">{quote.deliveryLabel}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Pay after cleaning is done.
        </p>
      </div>

      <div className="sticky bottom-4 mt-10 space-y-2">
        <Link
          href="/pickup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 w-full rounded-full text-base"
          )}
        >
          Continue to pickup
        </Link>
        <Button
          variant="ghost"
          className="h-11 w-full rounded-full"
          onClick={() => {
            clearAnalysis();
            router.push("/upload");
          }}
        >
          Start over
        </Button>
      </div>
    </div>
  );
}
