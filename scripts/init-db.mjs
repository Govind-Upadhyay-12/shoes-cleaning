/**
 * Ensures MongoDB collections + indexes exist.
 * Run: npm run db:init
 */
import { config } from "dotenv";
import mongoose from "mongoose";

config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    image: String,
    phone: { type: String, index: true },
    provider: { type: String, default: "clerk" },
  },
  { timestamps: true, collection: "users" }
);

const BookingSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    clerkId: { type: String, required: true, index: true },
    userEmail: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    pickup: {
      fullName: String,
      phone: String,
      address: String,
      pincode: String,
      preferredPickupTime: String,
      notes: String,
    },
    analysis: {
      shoe_type: String,
      brand: String,
      material: String,
      primary_color: String,
      dirt_level: String,
      stains: [String],
      visible_damage: Boolean,
      recommended_service: String,
      estimated_cleaning_type: String,
      confidence: Number,
    },
    quote: {
      price: Number,
      etaHours: Number,
      deliveryLabel: String,
      includes: [String],
      requiresManualReview: Boolean,
    },
    paymentStatus: {
      type: String,
      enum: ["pay_after_cleaning", "pending", "paid"],
      default: "pay_after_cleaning",
      index: true,
    },
    paymentMethod: { type: String, default: "pay_after_service" },
    paidAt: Date,
    amountPaid: Number,
    status: {
      type: String,
      enum: [
        "confirmed",
        "pickup_assigned",
        "picked_up",
        "cleaning",
        "quality_check",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "confirmed",
      index: true,
    },
    statusIndex: { type: Number, default: 1 },
    whatsappSent: { type: Boolean, default: false },
    whatsappOpenedAt: Date,
    source: { type: String, default: "web" },
  },
  { timestamps: true, collection: "bookings" }
);

BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ clerkId: 1, createdAt: -1 });
BookingSchema.index({ status: 1, paymentStatus: 1 });

const AssessmentSchema = new mongoose.Schema(
  {
    clerkId: { type: String, index: true },
    userEmail: { type: String, index: true },
    shoe_type: { type: String, required: true },
    brand: String,
    material: String,
    primary_color: String,
    dirt_level: String,
    stains: [String],
    visible_damage: Boolean,
    recommended_service: { type: String, required: true },
    estimated_cleaning_type: String,
    confidence: Number,
    quotePrice: Number,
    quoteEtaHours: Number,
    imageCount: { type: Number, default: 3 },
    convertedToBooking: { type: Boolean, default: false },
    bookingOrderId: String,
  },
  { timestamps: true, collection: "assessments" }
);

AssessmentSchema.index({ createdAt: -1 });

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);

  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
  const Assessment =
    mongoose.models.Assessment || mongoose.model("Assessment", AssessmentSchema);

  await Promise.all([
    User.syncIndexes(),
    Booking.syncIndexes(),
    Assessment.syncIndexes(),
  ]);

  // Touch collections so they appear in Atlas even if empty
  await Promise.all([
    User.createCollection(),
    Booking.createCollection(),
    Assessment.createCollection(),
  ]);

  const counts = {
    users: await User.countDocuments(),
    bookings: await Booking.countDocuments(),
    assessments: await Assessment.countDocuments(),
  };

  console.log("MongoDB schema ready.");
  console.log("Collections: users, bookings, assessments");
  console.log("Document counts:", counts);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(async (error) => {
  console.error("DB init failed:", error);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});
