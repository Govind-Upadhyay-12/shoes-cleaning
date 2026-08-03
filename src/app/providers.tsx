"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { UserSync } from "@/components/auth/user-sync";
import { VisitTracker } from "@/components/analytics/visit-tracker";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 1 },
          mutations: { retry: 0 },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <UserSync />
      <Suspense fallback={null}>
        <VisitTracker />
      </Suspense>
      {children}
    </QueryClientProvider>
  );
}
