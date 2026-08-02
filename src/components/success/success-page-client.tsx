"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { loadOrder } from "@/utils/storage";
import type { OrderRecord } from "@/types";
import { PICKUP_SLOTS } from "@/constants";
import { cn } from "@/lib/utils";

export function SuccessPageClient() {
  const params = useSearchParams();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [windowLabel, setWindowLabel] = useState("2 PM - 3 PM");
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
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-success"
      >
        <Check className="h-10 w-10" strokeWidth={2.5} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-3xl font-semibold tracking-tight"
      >
        Cleaning booked
      </motion.h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your request is saved. Complete confirmation on WhatsApp — pay only
        after cleaning is done.
      </p>

      <div className="mt-8 w-full rounded-[2rem] border border-border bg-white p-6 text-left shadow-sm">
        <p className="text-sm text-muted-foreground">Pickup Today</p>
        <p className="mt-1 text-lg font-semibold">{windowLabel}</p>
        <p className="mt-5 text-sm text-muted-foreground">Estimated Delivery</p>
        <p className="mt-1 text-lg font-semibold">
          {order?.quote.deliveryLabel || "Today before 9 PM"}
        </p>
        <p className="mt-5 text-sm text-muted-foreground">Payment</p>
        <p className="mt-1 text-lg font-semibold text-primary">
          Pay after cleaning
        </p>
        {order && (
          <p className="mt-5 text-xs text-muted-foreground">
            Order ID · {order.id}
          </p>
        )}
      </div>

      <div className="mt-6 flex w-full flex-col gap-3">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full rounded-full text-base"
            )}
          >
            <MessageCircle className="mr-1 h-4 w-4" />
            Open WhatsApp booking
          </a>
        )}
        <Link
          href={order ? `/track/${order.id}` : "/"}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-12 w-full rounded-full text-base"
          )}
        >
          Track Order
        </Link>
      </div>
    </div>
  );
}
