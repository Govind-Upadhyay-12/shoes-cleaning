"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Timeline } from "@/components/tracking/timeline";
import { buttonVariants } from "@/components/ui/button";
import type { OrderRecord } from "@/types";
import { loadOrder } from "@/utils/storage";
import { displayShoeTitle, formatINR } from "@/utils/pricing";
import { getEstimatedDelivery } from "@/utils/booking-display";
import { cn } from "@/lib/utils";

export function TrackPageClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const response = await fetch(`/api/bookings/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          if (!cancelled) {
            setOrder({
              id: data.id,
              analysis: data.analysis,
              quote: data.quote,
              pickup: data.pickup,
              createdAt: data.createdAt,
              statusIndex: data.statusIndex ?? 1,
              paymentStatus: data.paymentStatus,
            });
            return;
          }
        }
      } catch {
        // fall back to local cache
      }

      if (!cancelled) setOrder(loadOrder(orderId));
    }

    load().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Order not found</h1>
        <Link
          href="/bookings"
          className={cn(buttonVariants(), "mt-6 inline-flex rounded-full")}
        >
          My Bookings
        </Link>
      </div>
    );
  }

  const eta = getEstimatedDelivery(order.createdAt, order.quote.etaHours);
  const delivered = order.statusIndex >= 6;

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <p className="text-sm text-muted-foreground">Order {order.id}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        {displayShoeTitle(order.analysis)}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {formatINR(order.quote.price)}
        {" · "}
        {delivered ? "Delivered" : eta.remainingLabel}
      </p>
      {!delivered && (
        <p className="mt-1 text-sm text-primary">Ready by {eta.label}</p>
      )}

      <div className="mt-10">
        <Timeline currentIndex={order.statusIndex} />
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <Link
          href="/bookings"
          className={cn(
            buttonVariants(),
            "flex h-12 items-center justify-center rounded-full"
          )}
        >
          My Bookings
        </Link>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex h-11 items-center justify-center rounded-full"
          )}
        >
          Home
        </Link>
      </div>
    </div>
  );
}
