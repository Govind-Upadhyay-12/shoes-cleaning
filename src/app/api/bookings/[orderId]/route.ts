import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";

export const runtime = "nodejs";

type Params = { params: Promise<{ orderId: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { orderId } = await params;
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    await connectDB();
    const booking = await Booking.findOne({ orderId }).lean();

    if (!booking) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: booking.orderId,
      analysis: booking.analysis,
      quote: booking.quote,
      pickup: booking.pickup,
      createdAt: booking.createdAt,
      statusIndex: booking.statusIndex,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      paymentMethod: booking.paymentMethod,
      userName: booking.userName,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
