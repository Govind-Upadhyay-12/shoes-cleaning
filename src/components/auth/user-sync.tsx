"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

/**
 * On Clerk sign-in, upsert the user into MongoDB once per session.
 */
export function UserSync() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const syncedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) return;
    if (syncedFor.current === userId) return;

    syncedFor.current = userId;

    fetch("/api/users/sync", { method: "POST" }).catch((error) => {
      console.error("Failed to sync user to DB:", error);
      syncedFor.current = null;
    });
  }, [isLoaded, isSignedIn, userId]);

  return null;
}
