"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { AuthBookButton } from "@/components/auth/auth-book-button";
import { buttonVariants } from "@/components/ui/button";
import type { PickupDetails, PricingQuote, ShoeAnalysis } from "@/types";
import {
  formatPaymentLabel,
  formatStatusLabel,
  getEstimatedDelivery,
} from "@/utils/booking-display";
import { displayShoeTitle, formatINR } from "@/utils/pricing";
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
        if (!cancelled) setBookings(data.bookings || []);
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
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
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
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <Package className="mx-auto h-8 w-8 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold">No bookings yet</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Book a cleaning and track it here.
        </p>
        <AuthBookButton className="mt-6 rounded-full px-6">
          Book Cleaning
        </AuthBookButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Status, time left, and price.
          </p>
        </div>
        <AuthBookButton className="rounded-full px-4 text-sm">
          Book again
        </AuthBookButton>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {bookings.map((booking) => {
          const eta = getEstimatedDelivery(
            booking.createdAt,
            booking.quote.etaHours
          );
          const delivered =
            booking.status === "delivered" || booking.statusIndex >= 6;

          return (
            <li key={booking.orderId} className="py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {booking.orderId}
                  </p>
                  <h2 className="mt-0.5 text-lg font-semibold">
                    {displayShoeTitle(booking.analysis)}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatStatusLabel(booking.status, booking.statusIndex)}
                    {" · "}
                    {delivered ? "Done" : eta.remainingLabel}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {formatINR(booking.quote.price)}
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · {formatPaymentLabel(booking.paymentStatus)}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/track/${booking.orderId}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "shrink-0 rounded-full"
                  )}
                >
                  Track
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
