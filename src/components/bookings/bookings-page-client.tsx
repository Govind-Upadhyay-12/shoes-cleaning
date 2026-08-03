"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock3,
  MapPin,
  Package,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AuthBookButton } from "@/components/auth/auth-book-button";
import { buttonVariants } from "@/components/ui/button";
import type { PickupDetails, PricingQuote, ShoeAnalysis } from "@/types";
import {
  formatBookedAt,
  formatPaymentLabel,
  formatStatusLabel,
  getEstimatedDelivery,
} from "@/utils/booking-display";
import { displayShoeTitle, formatINR } from "@/utils/pricing";
import { PICKUP_SLOTS } from "@/constants";
import { cn } from "@/lib/utils";

type BookingListItem = {
  id: string;
  orderId: string;
  analysis: ShoeAnalysis;
  quote: PricingQuote;
  pickup: PickupDetails;
  createdAt: string;
  status: string;
  statusIndex: number;
  paymentStatus?: string;
};

export function BookingsPageClient() {
  const [bookings, setBookings] = useState<BookingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to load bookings");
        }
        if (!cancelled) {
          setBookings(data.bookings || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load bookings");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading your bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Couldn’t load bookings</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={cn(buttonVariants(), "mt-6 rounded-full")}
        >
          Try again
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
          <Package className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          No bookings yet
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Book a cleaning to see status, ETA, and pickup details here.
        </p>
        <AuthBookButton className="mt-6 rounded-full px-6">
          Book Cleaning
          <ArrowRight className="ml-1 h-4 w-4" />
        </AuthBookButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Your orders</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track status, estimated delivery, and pickup details.
          </p>
        </div>
        <AuthBookButton className="rounded-full px-5">
          Book again
        </AuthBookButton>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const eta = getEstimatedDelivery(
            booking.createdAt,
            booking.quote.etaHours
          );
          const slot = PICKUP_SLOTS.find(
            (s) => s.value === booking.pickup.preferredPickupTime
          );
          const delivered = booking.status === "delivered" || booking.statusIndex >= 6;
          const cancelled = booking.status === "cancelled";

          return (
            <article
              key={booking.orderId}
              className="rounded-[1.5rem] border border-border bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Order {booking.orderId}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight">
                    {displayShoeTitle(booking.analysis)}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.analysis.recommended_service} ·{" "}
                    {booking.analysis.estimated_cleaning_type}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    cancelled
                      ? "bg-red-50 text-destructive"
                      : delivered
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-accent text-primary"
                  )}
                >
                  {formatStatusLabel(booking.status, booking.statusIndex)}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-background px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" />
                    Estimated delivery
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                    {eta.label}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-xs",
                      delivered
                        ? "text-emerald-700"
                        : eta.isOverdue
                          ? "text-amber-700"
                          : "text-primary"
                    )}
                  >
                    {delivered
                      ? "Delivered"
                      : cancelled
                        ? "Cancelled"
                        : eta.remainingLabel}
                    {!delivered && !cancelled && booking.quote.etaHours != null && (
                      <> · {booking.quote.etaHours}h service window</>
                    )}
                  </p>
                </div>

                <div className="rounded-2xl bg-background px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    Price & payment
                  </div>
                  <p className="mt-1.5 text-sm font-semibold">
                    {formatINR(booking.quote.price)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatPaymentLabel(booking.paymentStatus)}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {booking.pickup.address}, {booking.pickup.pincode}
                    <span className="block text-xs">
                      Pickup: {slot?.window || booking.pickup.preferredPickupTime}
                    </span>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {booking.pickup.fullName} · {booking.pickup.phone}
                </p>
                <p className="text-xs">Booked {formatBookedAt(booking.createdAt)}</p>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/track/${booking.orderId}`}
                  className={cn(
                    buttonVariants(),
                    "h-11 flex-1 rounded-full"
                  )}
                >
                  Track order
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
