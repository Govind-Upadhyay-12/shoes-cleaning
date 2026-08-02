import { PRICING } from "@/constants";
import type { CleaningType, PricingQuote, ShoeAnalysis } from "@/types";

export function normalizeCleaningType(value: string): CleaningType {
  const cleaned = value.trim().toLowerCase();
  if (cleaned.includes("restor")) return "Restoration";
  if (cleaned.includes("premium")) return "Premium";
  if (cleaned.includes("basic")) return "Basic";
  return "Deep";
}

export function getDeliveryLabel(etaHours: number | null): string {
  if (etaHours === null) return "After inspection (usually 24–48 hrs)";

  const now = new Date();
  const delivery = new Date(now.getTime() + etaHours * 60 * 60 * 1000);
  const isToday = delivery.toDateString() === now.toDateString();
  const hour = delivery.getHours();
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  if (isToday) {
    return `Today before ${displayHour} ${period}`;
  }

  return `Tomorrow before ${displayHour} ${period}`;
}

export function buildQuote(analysis: ShoeAnalysis): PricingQuote {
  const type = normalizeCleaningType(analysis.estimated_cleaning_type);
  const config = PRICING[type];

  return {
    price: config.price,
    etaHours: config.etaHours,
    deliveryLabel: getDeliveryLabel(config.etaHours),
    includes: config.includes,
    requiresManualReview: config.requiresManualReview,
  };
}

export function formatINR(amount: number | null): string {
  if (amount === null) return "Custom quote";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function displayShoeTitle(analysis: ShoeAnalysis): string {
  const brand = analysis.brand?.trim();
  if (brand && brand.toLowerCase() !== "null" && brand.toLowerCase() !== "unknown") {
    return `${brand} ${analysis.shoe_type}`;
  }
  return analysis.shoe_type;
}
