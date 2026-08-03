import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * One document per IP — rolling visitor profile.
 * Updated on every page load / refresh.
 */
const VisitorSchema = new Schema(
  {
    ip: { type: String, required: true, unique: true, index: true },
    visitCount: { type: Number, default: 1, min: 1 },
    firstSeenAt: { type: Date, required: true },
    lastSeenAt: { type: Date, required: true, index: true },

    // Network / geo (Vercel + forwarded headers)
    country: { type: String },
    region: { type: String },
    city: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    timezone: { type: String },

    // Browser / device
    userAgent: { type: String },
    acceptLanguage: { type: String },
    language: { type: String },
    languages: { type: [String], default: [] },
    platform: { type: String },
    mobile: { type: Boolean },
    secChUa: { type: String },
    secChUaPlatform: { type: String },

    // Client environment
    screenWidth: { type: Number },
    screenHeight: { type: Number },
    viewportWidth: { type: Number },
    viewportHeight: { type: Number },
    colorDepth: { type: Number },
    devicePixelRatio: { type: Number },
    connectionType: { type: String },

    // Navigation
    firstPath: { type: String },
    lastPath: { type: String },
    firstReferrer: { type: String },
    lastReferrer: { type: String },
    host: { type: String },

    // Auth (if signed in when visiting)
    clerkId: { type: String, index: true },
    userEmail: { type: String, lowercase: true },

    // Recent paths (capped in app logic)
    recentPaths: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: "visitors",
  }
);

VisitorSchema.index({ country: 1, lastSeenAt: -1 });

export type VisitorDocument = InferSchemaType<typeof VisitorSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Visitor: Model<VisitorDocument> =
  mongoose.models.Visitor ||
  mongoose.model<VisitorDocument>("Visitor", VisitorSchema);
