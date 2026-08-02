import type { CleaningType } from "@/types";

export const FOOTWEAR_TYPE_OPTIONS = [
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

export const MATERIAL_OPTIONS = [
  "Mesh",
  "Leather",
  "Suede",
  "Canvas",
  "Rubber",
  "Synthetic",
  "Mixed",
] as const;

export const COLOR_OPTIONS = [
  "White",
  "Black",
  "Brown",
  "Blue",
  "Red",
  "Grey",
  "Multi",
  "Other",
] as const;

export const DIRT_LEVEL_OPTIONS = ["Low", "Medium", "High"] as const;

export const STAIN_OPTIONS = [
  "Mud",
  "Dust",
  "Oil",
  "Grass",
  "Scuff",
  "Water Marks",
  "Food",
  "None",
] as const;

export type FootwearType = (typeof FOOTWEAR_TYPE_OPTIONS)[number];
export type MaterialType = (typeof MATERIAL_OPTIONS)[number];
export type ColorType = (typeof COLOR_OPTIONS)[number];
export type DirtLevel = (typeof DIRT_LEVEL_OPTIONS)[number];
export type StainType = (typeof STAIN_OPTIONS)[number];

export type EstimateInput = {
  shoe_type: FootwearType;
  brand?: string | null;
  material: MaterialType;
  primary_color: ColorType;
  dirt_level: DirtLevel;
  stains: StainType[];
  visible_damage: boolean;
};

export type RuleResult = {
  shoe_type: FootwearType;
  brand: string | null;
  material: MaterialType;
  primary_color: ColorType;
  dirt_level: DirtLevel;
  stains: string[];
  visible_damage: boolean;
  recommended_service: string;
  estimated_cleaning_type: CleaningType;
  confidence: number;
};

const PREMIUM_MATERIALS: MaterialType[] = ["Leather", "Suede"];
const LIGHT_TYPES: FootwearType[] = ["Slippers", "Flip-Flops", "Sandals"];
const FORMAL_TYPES: FootwearType[] = ["Formal Shoes", "Boots", "Loafers", "Heels"];

/**
 * Market-aligned rules (India):
 * Basic ₹299 · Deep ₹399 · Premium/Leather ₹599
 */
export function applyCleaningRules(input: EstimateInput): RuleResult {
  const stains = (input.stains || []).filter((s) => s !== "None");
  const brand = input.brand?.trim() || null;
  const isPremiumMaterial = PREMIUM_MATERIALS.includes(input.material);
  const isLightPair = LIGHT_TYPES.includes(input.shoe_type);
  const isFormalPair = FORMAL_TYPES.includes(input.shoe_type);

  let type: CleaningType = "Deep";
  let service = "Deep Cleaning";

  // 1) Damage → restoration quote path
  if (input.visible_damage) {
    return {
      shoe_type: input.shoe_type,
      brand,
      material: input.material,
      primary_color: input.primary_color,
      dirt_level: input.dirt_level,
      stains,
      visible_damage: true,
      recommended_service: "Restoration (inspection)",
      estimated_cleaning_type: "Restoration",
      confidence: 100,
    };
  }

  // 2) Leather / suede always Premium (market: leather care costs more)
  if (isPremiumMaterial) {
    type = "Premium";
    service =
      input.material === "Leather"
        ? "Leather Care Cleaning"
        : "Suede Care Cleaning";
  }
  // 3) Formal / boots / heels → at least Deep; leather already Premium
  else if (isFormalPair) {
    if (input.dirt_level === "High" || stains.length >= 2) {
      type = "Premium";
      service = "Premium Formal Cleaning";
    } else {
      type = "Deep";
      service = "Deep Cleaning";
    }
  }
  // 4) White sneakers with mud / high dirt → Premium (sole whitening)
  else if (
    (input.shoe_type === "Sneakers" || input.shoe_type === "Sports Shoes") &&
    input.primary_color === "White" &&
    (input.dirt_level === "High" || stains.includes("Mud"))
  ) {
    type = "Premium";
    service = "White Sneaker Restoration";
  }
  // 5) High dirt or multiple stains → Premium
  else if (input.dirt_level === "High" || stains.length >= 2) {
    type = "Premium";
    service = "Premium Deep Cleaning";
  }
  // 6) Light footwear + low dirt → Basic ₹299
  else if (isLightPair && input.dirt_level === "Low" && stains.length === 0) {
    type = "Basic";
    service = "Basic Cleaning";
  }
  // 7) Low dirt mesh/canvas/rubber → Basic
  else if (
    input.dirt_level === "Low" &&
    stains.length === 0 &&
    (input.material === "Mesh" ||
      input.material === "Canvas" ||
      input.material === "Rubber" ||
      input.material === "Synthetic")
  ) {
    type = "Basic";
    service = "Basic Cleaning";
  }
  // 8) Default market standard → Deep ₹399
  else {
    type = "Deep";
    service = "Deep Cleaning";
  }

  return {
    shoe_type: input.shoe_type,
    brand,
    material: input.material,
    primary_color: input.primary_color,
    dirt_level: input.dirt_level,
    stains,
    visible_damage: false,
    recommended_service: service,
    estimated_cleaning_type: type,
    confidence: 100,
  };
}
