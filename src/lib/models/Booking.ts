import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const PickupSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    preferredPickupTime: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      required: true,
    },
    notes: { type: String },
  },
  { _id: false }
);

const AnalysisSchema = new Schema(
  {
    shoe_type: { type: String, required: true },
    brand: { type: String, default: null },
    material: { type: String },
    primary_color: { type: String },
    dirt_level: { type: String },
    stains: { type: [String], default: [] },
    visible_damage: { type: Boolean, default: false },
    recommended_service: { type: String, required: true },
    estimated_cleaning_type: {
      type: String,
      enum: ["Basic", "Deep", "Premium", "Restoration"],
      required: true,
    },
    confidence: { type: Number, min: 0, max: 100 },
  },
  { _id: false }
);

const QuoteSchema = new Schema(
  {
    price: { type: Number, default: null },
    etaHours: { type: Number, default: null },
    deliveryLabel: { type: String, required: true },
    includes: { type: [String], default: [] },
    requiresManualReview: { type: Boolean, default: false },
  },
  { _id: false }
);

const BookingSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    clerkId: { type: String, required: true, index: true },
    userEmail: { type: String, required: true, lowercase: true, index: true },
    userName: { type: String, required: true },
    pickup: { type: PickupSchema, required: true },
    analysis: { type: AnalysisSchema, required: true },
    quote: { type: QuoteSchema, required: true },
    paymentStatus: {
      type: String,
      enum: ["pay_after_cleaning", "pending", "paid"],
      default: "pay_after_cleaning",
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["pay_after_service", "upi", "cash", "card"],
      default: "pay_after_service",
    },
    paidAt: { type: Date, default: null },
    amountPaid: { type: Number, default: null },
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
    statusIndex: { type: Number, default: 1, min: 0, max: 6 },
    whatsappSent: { type: Boolean, default: false },
    whatsappOpenedAt: { type: Date, default: null },
    source: { type: String, default: "web" },
  },
  {
    timestamps: true,
    collection: "bookings",
  }
);

BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ clerkId: 1, createdAt: -1 });
BookingSchema.index({ status: 1, paymentStatus: 1 });

export type BookingDocument = InferSchemaType<typeof BookingSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Booking: Model<BookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", BookingSchema);
