import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Gemini disabled — use POST /api/estimate with form details instead. */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "AI analysis is disabled. Use /api/estimate with footwear details.",
    },
    { status: 410 }
  );
}
