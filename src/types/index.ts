export type CleaningType = "Basic" | "Deep" | "Premium" | "Restoration";

export type ShoeAnalysis = {
  shoe_type: string;
  brand: string | null;
  material: string;
  primary_color: string;
  dirt_level: string;
  stains: string[];
  visible_damage: boolean;
  recommended_service: string;
  estimated_cleaning_type: CleaningType;
  confidence: number;
  assessmentId?: string | null;
};

export type PricingQuote = {
  price: number | null;
  etaHours: number | null;
  deliveryLabel: string;
  includes: string[];
  requiresManualReview: boolean;
  /** List price before any coupon */
  originalPrice?: number | null;
  discountPercent?: number;
  couponCode?: string | null;
  couponApplied?: boolean;
};

export type PickupSlot = "Morning" | "Afternoon" | "Evening";

export type PickupDetails = {
  fullName: string;
  phone: string;
  address: string;
  pincode: string;
  preferredPickupTime: PickupSlot;
  notes?: string;
};

export type OrderRecord = {
  id: string;
  analysis: ShoeAnalysis;
  quote: PricingQuote;
  pickup: PickupDetails;
  previewImage?: string;
  createdAt: string;
  statusIndex: number;
  paymentStatus?: "pay_after_cleaning" | "pending" | "paid";
};

export type UploadSlot = "front" | "side" | "sole";

export type UploadedImage = {
  slot: UploadSlot;
  file?: File;
  previewUrl: string;
  name: string;
};
