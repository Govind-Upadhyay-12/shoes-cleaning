import { GoogleGenAI } from "@google/genai";
import type { ShoeAnalysis } from "@/types";
import { normalizeCleaningType } from "@/utils/pricing";

export const ANALYSIS_PROMPT = `You are ShoeSwift's footwear cleaning assessment AI for India.
Analyze ALL provided footwear images together (same pair from different angles).
Accept ANY footwear: sneakers, sports shoes, formal shoes, boots, sandals, slippers, flip-flops, loafers, heels, traditional footwear (mojari/jutti), kids shoes, and more.

Return ONLY valid JSON (no markdown) with exactly this shape:
{
  "shoe_type": "Slippers",
  "brand": "Crocs",
  "material": "Rubber",
  "primary_color": "Black",
  "dirt_level": "High",
  "stains": ["Mud", "Dust"],
  "visible_damage": false,
  "recommended_service": "Deep Cleaning",
  "estimated_cleaning_type": "Deep",
  "confidence": 98
}

Rules:
- shoe_type: specific footwear category (e.g. Sneakers, Sports Shoes, Formal Shoes, Boots, Sandals, Slippers, Flip-Flops, Loafers, Heels, Mojari, Kids Shoes, Other Footwear)
- estimated_cleaning_type must be one of: Basic, Deep, Premium, Restoration
- brand: brand if visible else null
- stains: array; use [] if none
- confidence: integer 0-100
- Use combined evidence from all images
- Never refuse slippers, sandals, or any other footwear type`;

export const MOCK_ANALYSIS: ShoeAnalysis = {
  shoe_type: "Slippers",
  brand: null,
  material: "Rubber",
  primary_color: "Black",
  dirt_level: "Medium",
  stains: ["Dust"],
  visible_damage: false,
  recommended_service: "Basic Cleaning",
  estimated_cleaning_type: "Basic",
  confidence: 95,
};

function normalizeAnalysis(raw: Partial<ShoeAnalysis>): ShoeAnalysis {
  return {
    shoe_type: raw.shoe_type || "Footwear",
    brand: raw.brand ?? null,
    material: raw.material || "Mixed",
    primary_color: raw.primary_color || "Unknown",
    dirt_level: raw.dirt_level || "Medium",
    stains: Array.isArray(raw.stains) ? raw.stains : [],
    visible_damage: Boolean(raw.visible_damage),
    recommended_service: raw.recommended_service || "Deep Cleaning",
    estimated_cleaning_type: normalizeCleaningType(
      String(raw.estimated_cleaning_type || "Deep")
    ),
    confidence:
      typeof raw.confidence === "number" ? Math.round(raw.confidence) : 90,
  };
}

export async function analyzeWithGemini(
  images: { mimeType: string; data: string }[]
): Promise<ShoeAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return MOCK_ANALYSIS;
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: [
      {
        role: "user",
        parts: [
          ...images.map((image) => ({
            inlineData: {
              mimeType: image.mimeType,
              data: image.data,
            },
          })),
          { text: ANALYSIS_PROMPT },
        ],
      },
    ],
    config: { responseMimeType: "application/json" },
  });

  const rawText = response.text?.trim() || "";
  const cleaned = rawText
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return normalizeAnalysis(JSON.parse(cleaned) as Partial<ShoeAnalysis>);
}
