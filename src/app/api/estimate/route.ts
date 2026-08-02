import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  applyCleaningRules,
  COLOR_OPTIONS,
  DIRT_LEVEL_OPTIONS,
  FOOTWEAR_TYPE_OPTIONS,
  MATERIAL_OPTIONS,
  STAIN_OPTIONS,
} from "@/lib/estimate-rules";
import { connectDB } from "@/lib/mongodb";
import { Assessment } from "@/lib/models/Assessment";
import { buildQuote } from "@/utils/pricing";

export const runtime = "nodejs";

const estimateSchema = z.object({
  shoe_type: z.enum(FOOTWEAR_TYPE_OPTIONS),
  brand: z.string().optional().nullable(),
  material: z.enum(MATERIAL_OPTIONS),
  primary_color: z.enum(COLOR_OPTIONS),
  dirt_level: z.enum(DIRT_LEVEL_OPTIONS),
  stains: z.array(z.enum(STAIN_OPTIONS)).default([]),
  visible_damage: z.boolean().default(false),
  imageCount: z.number().int().min(0).max(3).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = estimateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid footwear details", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const analysis = applyCleaningRules(parsed.data);
    const quote = buildQuote(analysis);

    let assessmentId: string | null = null;
    try {
      const { userId } = await auth();
      const clerkUser = userId ? await currentUser() : null;
      const email =
        clerkUser?.primaryEmailAddress?.emailAddress ||
        clerkUser?.emailAddresses?.[0]?.emailAddress ||
        undefined;

      await connectDB();
      const saved = await Assessment.create({
        clerkId: userId || undefined,
        userEmail: email,
        ...analysis,
        quotePrice: quote.price,
        quoteEtaHours: quote.etaHours,
        imageCount: parsed.data.imageCount ?? 0,
        convertedToBooking: false,
      });
      assessmentId = saved._id.toString();
    } catch (dbError) {
      console.error("Failed to save assessment:", dbError);
    }

    return NextResponse.json({
      ...analysis,
      assessmentId,
      quote,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create estimate" },
      { status: 500 }
    );
  }
}
