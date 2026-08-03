import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { NEW_USER_COUPON } from "@/constants";
import { isFirstBookingUser } from "@/lib/first-booking";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", eligible: false },
        { status: 401 }
      );
    }

    await connectDB();
    const eligible = await isFirstBookingUser(userId);

    return NextResponse.json({
      eligible,
      coupon: eligible
        ? {
            code: NEW_USER_COUPON.code,
            percent: NEW_USER_COUPON.percent,
            label: NEW_USER_COUPON.label,
          }
        : null,
    });
  } catch (error) {
    console.error("Coupon eligibility error:", error);
    return NextResponse.json(
      { error: "Failed to check coupon", eligible: false },
      { status: 500 }
    );
  }
}
