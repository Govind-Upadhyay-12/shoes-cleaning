import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * One document per page load / refresh — full visit snapshot.
 */
const VisitSchema = new Schema(
  {
    ip: { type: String, required: true, index: true },
    path: { type: String, required: true },
    search: { type: String, default: "" },
    referrer: { type: String },
    host: { type: String },

    country: { type: String },
    region: { type: String },
    city: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    timezone: { type: String },

    userAgent: { type: String },
    acceptLanguage: { type: String },
    language: { type: String },
    languages: { type: [String], default: [] },
    platform: { type: String },
    mobile: { type: Boolean },
    secChUa: { type: String },
    secChUaPlatform: { type: String },

    screenWidth: { type: Number },
    screenHeight: { type: Number },
    viewportWidth: { type: Number },
    viewportHeight: { type: Number },
    colorDepth: { type: Number },
    devicePixelRatio: { type: Number },
    connectionType: { type: String },

    clerkId: { type: String, index: true },
    userEmail: { type: String, lowercase: true },

    isRefresh: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: "visits",
  }
);

VisitSchema.index({ createdAt: -1 });
VisitSchema.index({ ip: 1, createdAt: -1 });

export type VisitDocument = InferSchemaType<typeof VisitSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Visit: Model<VisitDocument> =
  mongoose.models.Visit || mongoose.model<VisitDocument>("Visit", VisitSchema);
