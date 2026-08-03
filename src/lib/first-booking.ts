import { Booking } from "@/lib/models/Booking";

/** True when this Clerk user has never completed a booking. */
export async function isFirstBookingUser(clerkId: string): Promise<boolean> {
  const count = await Booking.countDocuments({ clerkId });
  return count === 0;
}
