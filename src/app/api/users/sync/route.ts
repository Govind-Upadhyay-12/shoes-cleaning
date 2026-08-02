import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export const runtime = "nodejs";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email =
      clerkUser.primaryEmailAddress?.emailAddress ||
      clerkUser.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "No email on Clerk account" },
        { status: 400 }
      );
    }

    const name =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      clerkUser.fullName ||
      email.split("@")[0] ||
      "ShoeSwift User";

    const phone =
      clerkUser.primaryPhoneNumber?.phoneNumber ||
      clerkUser.phoneNumbers?.[0]?.phoneNumber ||
      undefined;

    await connectDB();

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        name,
        email,
        image: clerkUser.imageUrl,
        provider: "clerk",
        ...(phone ? { phone } : {}),
        lastSignInAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        image: user.image,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("User sync error:", error);
    return NextResponse.json(
      {
        error: "Failed to save user",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
