import type { NextRequest } from "next/server";

export function getClientIp(request: Request | NextRequest): string {
  const headers = request.headers;

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const cf = headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;

  const vercel = headers.get("x-vercel-forwarded-for")?.trim();
  if (vercel) {
    const first = vercel.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

export function getRequestMeta(request: Request | NextRequest) {
  const headers = request.headers;

  return {
    ip: getClientIp(request),
    userAgent: headers.get("user-agent") || undefined,
    acceptLanguage: headers.get("accept-language") || undefined,
    referrer: headers.get("referer") || undefined,
    host: headers.get("host") || undefined,
    secChUa: headers.get("sec-ch-ua") || undefined,
    secChUaPlatform: headers.get("sec-ch-ua-platform") || undefined,
    mobileHeader: headers.get("sec-ch-ua-mobile") || undefined,
    // Vercel edge geo headers (populated on Vercel deployments)
    country: headers.get("x-vercel-ip-country") || undefined,
    region: headers.get("x-vercel-ip-country-region") || undefined,
    city: headers.get("x-vercel-ip-city") || undefined,
    latitude: headers.get("x-vercel-ip-latitude") || undefined,
    longitude: headers.get("x-vercel-ip-longitude") || undefined,
    timezone: headers.get("x-vercel-ip-timezone") || undefined,
  };
}
