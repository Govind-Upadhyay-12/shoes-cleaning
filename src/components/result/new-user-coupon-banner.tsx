"use client";

import { Sparkles } from "lucide-react";
import { NEW_USER_COUPON } from "@/constants";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/utils/pricing";

type NewUserCouponBannerProps = {
  eligible: boolean;
  applied: boolean;
  originalPrice: number | null;
  discountedPrice: number | null;
  onApply: () => void;
  onRemove: () => void;
};

export function NewUserCouponBanner({
  eligible,
  applied,
  originalPrice,
  discountedPrice,
  onApply,
  onRemove,
}: NewUserCouponBannerProps) {
  if (!eligible) return null;

  const savings =
    originalPrice !== null && discountedPrice !== null
      ? originalPrice - discountedPrice
      : null;

  if (applied) {
    return (
      <div className="rounded-2xl border border-primary/25 bg-accent px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              {NEW_USER_COUPON.code} applied
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {NEW_USER_COUPON.percent}% new-user discount
              {savings !== null ? ` · you save ${formatINR(savings)}` : ""}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0 text-muted-foreground"
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary/30 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(11,27,58,0.04))] px-4 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            New user offer
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Apply <span className="font-medium text-foreground">{NEW_USER_COUPON.code}</span>{" "}
            for {NEW_USER_COUPON.percent}% off your first cleaning
            {originalPrice !== null && discountedPrice !== null ? (
              <>
                {" "}
                — pay {formatINR(discountedPrice)} instead of{" "}
                {formatINR(originalPrice)}
              </>
            ) : null}
          </p>
        </div>
        <Button
          type="button"
          className="h-10 shrink-0 rounded-full px-5"
          onClick={onApply}
        >
          Apply coupon
        </Button>
      </div>
    </div>
  );
}
