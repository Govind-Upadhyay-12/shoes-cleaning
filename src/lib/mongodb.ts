import mongoose from "mongoose";
import { User } from "@/lib/models/User";
import { Booking } from "@/lib/models/Booking";
import { Assessment } from "@/lib/models/Assessment";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  indexesSynced: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
  indexesSynced: false,
};

global.mongooseCache = cached;

async function syncSchemas() {
  if (cached.indexesSynced) return;
  // Ensure collections + indexes exist in MongoDB
  await Promise.all([
    User.syncIndexes(),
    Booking.syncIndexes(),
    Assessment.syncIndexes(),
  ]);
  cached.indexesSynced = true;
}

export async function connectDB() {
  if (cached.conn) {
    await syncSchemas();
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  await syncSchemas();
  return cached.conn;
}
