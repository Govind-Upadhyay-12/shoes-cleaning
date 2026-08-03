import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Visit } from "@/lib/models/Visit";
import { Visitor } from "@/lib/models/Visitor";
import { getRequestMeta } from "@/lib/request-meta";

export const runtime = "nodejs";

type ClientPayload = {
  path?: string;
  search?: string;
  referrer?: string;
  language?: string;
  languages?: string[];
  platform?: string;
  mobile?: boolean;
  screenWidth?: number;
  screenHeight?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  colorDepth?: number;
  devicePixelRatio?: number;
  timezone?: string;
  connectionType?: string;
  isRefresh?: boolean;
};

function asString(value: unknown, max = 500): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

function asNumber(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.round(value);
}

function asBoolean(value: unknown): boolean | undefined {
  if (typeof value !== "boolean") return undefined;
  return value;
}

function pickDefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== "") {
      (out as Record<string, unknown>)[key] = value;
    }
  }
  return out;
}

export async function POST(request: Request) {
  try {
    const meta = getRequestMeta(request);
    let body: ClientPayload = {};

    try {
      body = (await request.json()) as ClientPayload;
    } catch {
      body = {};
    }

    const path = asString(body.path, 300) || "/";
    const search = asString(body.search, 500) || "";
    const referrer =
      asString(body.referrer, 800) || meta.referrer || undefined;
    const language = asString(body.language, 32);
    const languages = Array.isArray(body.languages)
      ? body.languages
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.slice(0, 32))
          .slice(0, 12)
      : [];
    const platform =
      asString(body.platform, 64) ||
      asString(meta.secChUaPlatform, 64)?.replace(/"/g, "");
    const timezone = asString(body.timezone, 64) || meta.timezone;
    const connectionType = asString(body.connectionType, 64);

    let clerkId: string | undefined;
    let userEmail: string | undefined;

    try {
      const { userId } = await auth();
      if (userId) {
        clerkId = userId;
        const user = await currentUser();
        userEmail =
          user?.primaryEmailAddress?.emailAddress ||
          user?.emailAddresses?.[0]?.emailAddress ||
          undefined;
      }
    } catch {
      // Public analytics — auth optional
    }

    const mobile =
      asBoolean(body.mobile) ??
      (meta.mobileHeader === "?1"
        ? true
        : meta.mobileHeader === "?0"
          ? false
          : undefined);

    const screenWidth = asNumber(body.screenWidth);
    const screenHeight = asNumber(body.screenHeight);
    const viewportWidth = asNumber(body.viewportWidth);
    const viewportHeight = asNumber(body.viewportHeight);
    const colorDepth = asNumber(body.colorDepth);
    const devicePixelRatio = asNumber(body.devicePixelRatio);

    await connectDB();

    const now = new Date();

    const visit = await Visit.create({
      ip: meta.ip,
      path,
      search,
      referrer,
      host: meta.host,
      country: meta.country,
      region: meta.region,
      city: meta.city,
      latitude: meta.latitude,
      longitude: meta.longitude,
      timezone,
      userAgent: meta.userAgent,
      acceptLanguage: meta.acceptLanguage,
      language,
      languages,
      platform,
      mobile,
      secChUa: meta.secChUa,
      secChUaPlatform: meta.secChUaPlatform,
      screenWidth,
      screenHeight,
      viewportWidth,
      viewportHeight,
      colorDepth,
      devicePixelRatio,
      connectionType,
      clerkId,
      userEmail,
      isRefresh: Boolean(body.isRefresh),
    });

    const latestFields = pickDefined({
      lastSeenAt: now,
      lastPath: path,
      country: meta.country,
      region: meta.region,
      city: meta.city,
      latitude: meta.latitude,
      longitude: meta.longitude,
      timezone,
      userAgent: meta.userAgent,
      acceptLanguage: meta.acceptLanguage,
      language,
      languages: languages.length ? languages : undefined,
      platform,
      mobile,
      secChUa: meta.secChUa,
      secChUaPlatform: meta.secChUaPlatform,
      screenWidth,
      screenHeight,
      viewportWidth,
      viewportHeight,
      colorDepth,
      devicePixelRatio,
      connectionType,
      lastReferrer: referrer,
      host: meta.host,
      clerkId,
      userEmail,
    });

    await Visitor.findOneAndUpdate(
      { ip: meta.ip },
      {
        $set: latestFields,
        $setOnInsert: {
          ip: meta.ip,
          firstSeenAt: now,
          firstPath: path,
          firstReferrer: referrer || undefined,
        },
        $inc: { visitCount: 1 },
        $push: {
          recentPaths: {
            $each: [path],
            $position: 0,
            $slice: 20,
          },
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      ok: true,
      visitId: visit._id.toString(),
      ip: meta.ip,
    });
  } catch (error) {
    console.error("Visit tracking error:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
