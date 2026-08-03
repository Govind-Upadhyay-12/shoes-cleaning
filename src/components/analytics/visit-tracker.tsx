"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/** Dedupe Strict Mode double-mount + rapid remounts (2s window). */
const recentlyTracked = new Map<string, number>();

function getConnectionType(): string | undefined {
  if (typeof navigator === "undefined") return undefined;
  const connection =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).connection ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).mozConnection ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).webkitConnection;
  return connection?.effectiveType || connection?.type || undefined;
}

function isPageRefresh(): boolean {
  try {
    const nav = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload") return true;
  } catch {
    // ignore
  }
  return false;
}

/**
 * Fires once per route load / refresh. Server stores IP + request metadata.
 */
export function VisitTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const search = searchParams?.toString()
      ? `?${searchParams.toString()}`
      : "";
    const key = `${pathname}${search}`;
    const now = Date.now();
    const last = recentlyTracked.get(key);
    if (last && now - last < 2000) return;
    recentlyTracked.set(key, now);

    const payload = {
      path: pathname,
      search,
      referrer: document.referrer || "",
      language: navigator.language || "",
      languages: Array.from(navigator.languages || []),
      platform: navigator.platform || "",
      mobile: /Mobi|Android/i.test(navigator.userAgent),
      screenWidth: window.screen?.width,
      screenHeight: window.screen?.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      colorDepth: window.screen?.colorDepth,
      devicePixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connectionType: getConnectionType(),
      isRefresh: isPageRefresh(),
    };

    const body = JSON.stringify(payload);

    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      const sent = navigator.sendBeacon("/api/visit", blob);
      if (sent) return;
    }

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Analytics should never interrupt UX
    });
  }, [pathname, searchParams]);

  return null;
}
