import { Suspense } from "react";
import { SuccessPageClient } from "@/components/success/success-page-client";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          Confirming pickup...
        </div>
      }
    >
      <SuccessPageClient />
    </Suspense>
  );
}
