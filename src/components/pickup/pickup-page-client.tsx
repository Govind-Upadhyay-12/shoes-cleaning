"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { AddressForm } from "@/components/pickup/address-form";
import { NEW_USER_COUPON, PICKUP_SLOTS } from "@/constants";
import type { OrderRecord, PickupDetails, ShoeAnalysis } from "@/types";
import {
  applyNewUserCoupon,
  buildQuote,
  displayShoeTitle,
  formatINR,
} from "@/utils/pricing";
import {
  loadAnalysis,
  loadAssessmentId,
  loadCouponApplied,
  loadPreview,
  saveCouponApplied,
  saveOrder,
} from "@/utils/storage";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PickupPageClient() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const [analysis, setAnalysis] = useState<ShoeAnalysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!isSignedIn) return;
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
      }
    }

    checkEligibility();
    return () => {
      cancelled = true;
    };
  }, [isSignedIn]);

  const quote = useMemo(() => {
    if (!analysis) return null;
    const base = buildQuote(analysis);
    if (couponApplied && eligible) return applyNewUserCoupon(base);
    return base;
  }, [analysis, couponApplied, eligible]);

  async function onSubmit(pickup: PickupDetails) {
    if (!analysis || !quote) return;
    if (!isSignedIn) {
      setError("Please sign in to book cleaning");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const applyCoupon = couponApplied && eligible;
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup,
          analysis,
          applyCoupon,
          couponCode: applyCoupon ? NEW_USER_COUPON.code : undefined,
          assessmentId: analysis.assessmentId || loadAssessmentId(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Booking failed");
      }

      const slot = PICKUP_SLOTS.find(
        (s) => s.value === pickup.preferredPickupTime
      );

      const finalQuote = data.booking?.quote ?? quote;

      const order: OrderRecord = {
        id: data.orderId,
        analysis,
        quote: finalQuote,
        pickup,
        previewImage: preview || undefined,
        createdAt: new Date().toISOString(),
        statusIndex: 1,
        paymentStatus: "pay_after_cleaning",
      };

      saveOrder(order);
      saveCouponApplied(false);
      sessionStorage.setItem(
        "shoeswift_pickup_window",
        slot?.window || pickup.preferredPickupTime
      );
      sessionStorage.setItem("shoeswift_whatsapp_url", data.whatsappUrl);

      window.open(data.whatsappUrl, "_blank");
      router.push(`/success?order=${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
      setLoading(false);
    }
  }

  if (!isLoaded || !analysis || !quote) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to book cleaning
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create an account or sign in — then we send your booking to WhatsApp.
          Pay after cleaning.
        </p>
        <div className="mt-6 flex gap-3">
          <SignInButton mode="modal">
            <button
              type="button"
              className={cn(buttonVariants(), "rounded-full px-6")}
            >
              Sign in
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Pickup details</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {displayShoeTitle(analysis)} · {formatINR(quote.price)}
        {quote.couponApplied && quote.originalPrice != null ? (
          <span className="ml-1 line-through opacity-60">
            {formatINR(quote.originalPrice)}
          </span>
        ) : null}{" "}
        · {quote.deliveryLabel}. Pay after cleaning.
      </p>
      {quote.couponApplied && (
        <p className="mt-1 text-sm font-medium text-primary">
          {NEW_USER_COUPON.code} · {NEW_USER_COUPON.percent}% new-user discount
          applied
        </p>
      )}

      {error && (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}

      <div className="mt-8">
        <AddressForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
}
