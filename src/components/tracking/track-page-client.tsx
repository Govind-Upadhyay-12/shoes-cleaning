"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Timeline } from "@/components/tracking/timeline";
import { buttonVariants } from "@/components/ui/button";
import type { OrderRecord } from "@/types";
import { loadOrder } from "@/utils/storage";
import { displayShoeTitle, formatINR } from "@/utils/pricing";
import { cn } from "@/lib/utils";

export function TrackPageClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

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
            setPaymentStatus(data.paymentStatus);
            return;
          }
        }
      } catch {
        // fall back to local cache
      }

      if (!cancelled) {
        const local = loadOrder(orderId);
        setOrder(local);
        setPaymentStatus(local?.paymentStatus || null);
      }
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
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Order not found</h1>
        <p className="mt-2 text-muted-foreground">
          Start a new estimate to book pickup.
        </p>
        <Link
          href="/upload"
          className={cn(buttonVariants(), "mt-6 inline-flex rounded-full")}
        >
          Get Instant Estimate
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Live tracking</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Order {order.id}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {displayShoeTitle(order.analysis)} · {formatINR(order.quote.price)} ·{" "}
          {order.quote.deliveryLabel}
        </p>
        <p className="mt-2 text-sm font-medium text-primary">
          Payment:{" "}
          {paymentStatus === "paid"
            ? "Paid"
            : "Pay after cleaning is done"}
        </p>
      </div>

      <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
        <Timeline currentIndex={order.statusIndex} />
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/bookings"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex h-12 flex-1 items-center justify-center rounded-full"
          )}
        >
          My Bookings
        </Link>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex h-12 flex-1 items-center justify-center rounded-full"
          )}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
