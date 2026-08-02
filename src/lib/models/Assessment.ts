import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const AssessmentSchema = new Schema(
  {
    clerkId: { type: String, index: true },
    userEmail: { type: String, lowercase: true, index: true },
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
    quotePrice: { type: Number, default: null },
    quoteEtaHours: { type: Number, default: null },
    imageCount: { type: Number, default: 3 },
    convertedToBooking: { type: Boolean, default: false },
    bookingOrderId: { type: String, default: null },
  },
  {
    timestamps: true,
    collection: "assessments",
  }
);

AssessmentSchema.index({ createdAt: -1 });

export type AssessmentDocument = InferSchemaType<typeof AssessmentSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Assessment: Model<AssessmentDocument> =
  mongoose.models.Assessment ||
  mongoose.model<AssessmentDocument>("Assessment", AssessmentSchema);
