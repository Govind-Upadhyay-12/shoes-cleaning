import type { PickupDetails, PricingQuote, ShoeAnalysis } from "@/types";
import { displayShoeTitle, formatINR } from "@/utils/pricing";

type WhatsAppPayload = {
  orderId: string;
  pickup: PickupDetails;
  analysis: ShoeAnalysis;
  quote: PricingQuote;
  userEmail: string;
};

export function buildWhatsAppUrl(payload: WhatsAppPayload): string {
  const number =
    process.env.WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "919654536016";

  const shoe = displayShoeTitle(payload.analysis);
  const price = formatINR(payload.quote.price);
  const original =
    payload.quote.couponApplied && payload.quote.originalPrice != null
      ? formatINR(payload.quote.originalPrice)
      : null;
  const couponLine =
    payload.quote.couponApplied && payload.quote.couponCode
      ? `\n*Coupon:* ${payload.quote.couponCode} (${payload.quote.discountPercent}% off)`
      : "";
  const notes = payload.pickup.notes?.trim()
    ? `\nNotes: ${payload.pickup.notes}`
    : "";

  const message = `Hi Plugzzy Clean 👋
I want to *book cleaning*.

*Order ID:* ${payload.orderId}

*Footwear:* ${shoe}
*Service:* ${payload.analysis.recommended_service}
*Dirt:* ${payload.analysis.dirt_level}
*Price:* ${price}${original ? ` ~~${original}~~` : ""} *(Pay after cleaning)*${couponLine}
*Delivery:* ${payload.quote.deliveryLabel}

*Pickup*
Name: ${payload.pickup.fullName}
Phone: ${payload.pickup.phone}
Address: ${payload.pickup.address}
Pincode: ${payload.pickup.pincode}
Slot: ${payload.pickup.preferredPickupTime}${notes}

Email: ${payload.userEmail}

Please confirm pickup for Order ID *${payload.orderId}*.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
