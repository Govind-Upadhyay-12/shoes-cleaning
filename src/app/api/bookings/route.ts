import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NEW_USER_COUPON } from "@/constants";
import { bengaluruPincodeError, isBengaluruPincode } from "@/lib/bengaluru";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";
import { Assessment } from "@/lib/models/Assessment";
import { isFirstBookingUser } from "@/lib/first-booking";
import { upsertClerkUser } from "@/lib/upsert-user";
import { applyNewUserCoupon, buildQuote } from "@/utils/pricing";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Please sign in to book cleaning" },
        { status: 401 }
      );
    }

    const clerkUser = await currentUser();
    const email =
      clerkUser?.primaryEmailAddress?.emailAddress ||
      clerkUser?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "No email on your account. Please update your profile." },
        { status: 400 }
      );
    }

    const name =
      [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
      clerkUser?.fullName ||
      "Plugzzy Clean User";

    const body = await request.json();
    const { pickup, analysis, assessmentId, applyCoupon, couponCode } = body;

    if (!pickup?.fullName || !pickup?.phone || !pickup?.address || !pickup?.pincode) {
      return NextResponse.json(
        { error: "Incomplete pickup details" },
        { status: 400 }
      );
    }

    if (!isBengaluruPincode(String(pickup.pincode))) {
      return NextResponse.json(
        { error: bengaluruPincodeError() },
        { status: 400 }
      );
    }

    if (!analysis?.estimated_cleaning_type || !analysis?.recommended_service) {
      return NextResponse.json(
        { error: "Missing analysis" },
        { status: 400 }
      );
    }

    await connectDB();

    const dbUser = await upsertClerkUser({
      clerkId: userId,
      name,
      email,
      image: clerkUser?.imageUrl,
      phone: pickup.phone,
    });

    let quote = buildQuote(analysis);
    const wantsCoupon =
      applyCoupon === true ||
      couponCode === NEW_USER_COUPON.code ||
      body?.quote?.couponApplied === true ||
      body?.quote?.couponCode === NEW_USER_COUPON.code;

    if (wantsCoupon) {
      const eligible = await isFirstBookingUser(userId);
      if (!eligible) {
        return NextResponse.json(
          {
            error:
              "New-user coupon is only valid on your first booking.",
          },
          { status: 400 }
        );
      }
      quote = applyNewUserCoupon(quote);
    }

    const orderId = `SS${Date.now().toString().slice(-8)}`;

    const booking = await Booking.create({
      orderId,
      userId: dbUser._id,
      clerkId: userId,
      userEmail: email,
      userName: name,
      pickup,
      analysis,
      quote,
      paymentStatus: "pay_after_cleaning",
      paymentMethod: "pay_after_service",
      status: "confirmed",
      statusIndex: 1,
      whatsappSent: true,
      whatsappOpenedAt: new Date(),
      source: "web",
    });

    const savedOrderId = booking.orderId;

    if (assessmentId) {
      await Assessment.findByIdAndUpdate(assessmentId, {
        convertedToBooking: true,
        bookingOrderId: savedOrderId,
        clerkId: userId,
        userEmail: email,
      });
    }

    const whatsappUrl = buildWhatsAppUrl({
      orderId: savedOrderId,
      pickup,
      analysis,
      quote,
      userEmail: email,
    });

    return NextResponse.json({
      success: true,
      orderId: savedOrderId,
      paymentStatus: booking.paymentStatus,
      paymentNote: "Pay after cleaning is completed",
      whatsappUrl,
      booking: {
        id: savedOrderId,
        analysis,
        quote,
        pickup,
        createdAt: booking.createdAt,
        statusIndex: booking.statusIndex,
        paymentStatus: booking.paymentStatus,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      {
        error: "Failed to create booking",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const rows = await Booking.find({ clerkId: userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const bookings = rows.map((booking) => ({
    id: booking.orderId,
    orderId: booking.orderId,
    analysis: booking.analysis,
    quote: booking.quote,
    pickup: booking.pickup,
    createdAt: booking.createdAt,
    status: booking.status,
    statusIndex: booking.statusIndex,
    paymentStatus: booking.paymentStatus,
    paymentMethod: booking.paymentMethod,
    userName: booking.userName,
    userEmail: booking.userEmail,
  }));

  return NextResponse.json({ bookings });
}
