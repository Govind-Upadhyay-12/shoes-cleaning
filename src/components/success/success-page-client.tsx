"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { loadOrder } from "@/utils/storage";
import type { OrderRecord } from "@/types";
import { PICKUP_SLOTS } from "@/constants";
import { formatINR } from "@/utils/pricing";
import { cn } from "@/lib/utils";

export function SuccessPageClient() {
  const params = useSearchParams();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [windowLabel, setWindowLabel] = useState("Soon");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  useEffect(() => {
    const id = params.get("order") || undefined;
    const data = loadOrder(id);
    setOrder(data);
    const stored = sessionStorage.getItem("shoeswift_pickup_window");
    if (stored) setWindowLabel(stored);
    else if (data) {
      const slot = PICKUP_SLOTS.find(
        (s) => s.value === data.pickup.preferredPickupTime
      );
      if (slot) setWindowLabel(slot.window);
    }
    setWhatsappUrl(sessionStorage.getItem("shoeswift_whatsapp_url"));
  }, [params]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check className="h-8 w-8" strokeWidth={2.5} />
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">Booked</h1>
      <p className="mt-2 text-muted-foreground">
        Pickup {windowLabel}. Ready{" "}
        {order?.quote.deliveryLabel?.toLowerCase() || "today"}. Pay after
        cleaning.
      </p>
      {order && (
        <p className="mt-3 text-sm text-muted-foreground">
          Order {order.id}
          {order.quote.price != null ? ` · ${formatINR(order.quote.price)}` : ""}
          {order.quote.couponApplied
            ? ` (${order.quote.couponCode || "NEW50"} applied)`
            : ""}
        </p>
      )}

      <div className="mt-8 flex w-full flex-col gap-2">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full rounded-full"
            )}
          >
            <MessageCircle className="mr-1 h-4 w-4" />
            Open WhatsApp
          </a>
        )}
        <Link
          href={order ? `/track/${order.id}` : "/bookings"}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-12 w-full rounded-full"
          )}
        >
          Track order
        </Link>
        <Link
          href="/bookings"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-11 w-full rounded-full"
          )}
        >
          My Bookings
        </Link>
      </div>
    </div>
  );
}
