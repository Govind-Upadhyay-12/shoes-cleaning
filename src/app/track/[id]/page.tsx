import { TrackPageClient } from "@/components/tracking/track-page-client";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TrackPageClient orderId={id} />;
}
