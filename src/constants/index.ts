import type { CleaningType, PickupSlot } from "@/types";

export const BRAND = {
  name: "Plugzzy Clean",
  shortName: "Plugzzy",
  tagline: "India's Fastest Footwear Cleaning",
  usp: "Cleaned & delivered within 8–10 hours",
} as const;

export const FOOTWEAR_TYPES = [
  "Sneakers",
  "Sports Shoes",
  "Formal Shoes",
  "Boots",
  "Sandals",
  "Slippers",
  "Flip-Flops",
  "Loafers",
  "Heels",
  "Mojari",
  "Kids Shoes",
  "Other Footwear",
] as const;

export const PRICING: Record<
  CleaningType,
  {
    price: number | null;
    etaHours: number | null;
    includes: string[];
    requiresManualReview: boolean;
  }
> = {
  // Market-aligned India pricing (same-day USP)
  // Basic ~₹300 | Deep/standard ₹399 | Leather/premium ₹599+
  Basic: {
    price: 299,
    etaHours: 6,
    includes: [
      "Surface cleaning",
      "Dust & light stain wipe",
      "Odor freshener",
    ],
    requiresManualReview: false,
  },
  Deep: {
    price: 399,
    etaHours: 8,
    includes: [
      "Deep cleaning",
      "Mud & stain removal",
      "Sole scrub",
      "Odor treatment",
    ],
    requiresManualReview: false,
  },
  Premium: {
    price: 599,
    etaHours: 10,
    includes: [
      "Leather / delicate material care",
      "Conditioning & polish (leather)",
      "Sole whitening (if needed)",
      "Deep stain removal",
      "Protective finish",
    ],
    requiresManualReview: false,
  },
  Restoration: {
    // Damaged pairs — quoted after inspection (market: custom)
    price: 799,
    etaHours: null,
    includes: [
      "Manual inspection",
      "Repair assessment",
      "Custom restoration plan",
    ],
    requiresManualReview: true,
  },
};

export const PICKUP_SLOTS: {
  value: PickupSlot;
  label: string;
  window: string;
}[] = [
  { value: "Morning", label: "Morning", window: "9 AM – 12 PM" },
  { value: "Afternoon", label: "Afternoon", window: "12 PM – 4 PM" },
  { value: "Evening", label: "Evening", window: "4 PM – 8 PM" },
];

export const TRACKING_STEPS = [
  "Order Confirmed",
  "Pickup Assigned",
  "Picked Up",
  "Cleaning",
  "Quality Check",
  "Out For Delivery",
  "Delivered",
] as const;

export const UPLOAD_SLOTS = [
  { id: "front" as const, label: "Front", hint: "Full front view" },
  { id: "side" as const, label: "Side", hint: "Side profile" },
  { id: "sole" as const, label: "Sole", hint: "Bottom / sole" },
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const STORAGE_KEYS = {
  analysis: "shoeswift_analysis",
  preview: "shoeswift_preview",
  order: "shoeswift_order",
  assessmentId: "shoeswift_assessment_id",
  couponApplied: "shoeswift_coupon_applied",
} as const;

/** First booking only — 50% off */
export const NEW_USER_COUPON = {
  code: "NEW50",
  percent: 50,
  label: "New user · 50% off",
} as const;
