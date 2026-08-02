"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { PricingQuote, ShoeAnalysis } from "@/types";
import { displayShoeTitle, formatINR } from "@/utils/pricing";
import { Badge } from "@/components/ui/badge";

type Props = {
  analysis: ShoeAnalysis;
  quote: PricingQuote;
  previewImage?: string | null;
};

export function ResultCard({ analysis, quote, previewImage }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm"
    >
      <div className="aspect-[4/3] bg-secondary">
        {previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewImage}
            alt={displayShoeTitle(analysis)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Footwear preview
          </div>
        )}
      </div>
      <div className="space-y-4 p-6">
        <div>
          <p className="text-sm text-muted-foreground">Detected Footwear</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {displayShoeTitle(analysis)}
          </h1>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Recommended Service</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="text-lg font-semibold">{analysis.recommended_service}</p>
            {quote.requiresManualReview && (
              <Badge variant="secondary">Manual review</Badge>
            )}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">Includes</p>
          <ul className="space-y-2">
            {quote.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-success">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function PriceCard({ quote }: { quote: PricingQuote }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-[2rem] border border-border bg-white p-6 shadow-sm"
    >
      <p className="text-sm text-muted-foreground">Price</p>
      <p className="mt-1 text-4xl font-semibold tracking-tight">
        {formatINR(quote.price)}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">Delivery</p>
      <p className="mt-1 text-lg font-medium">{quote.deliveryLabel}</p>
    </motion.div>
  );
}
