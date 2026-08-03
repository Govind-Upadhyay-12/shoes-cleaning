import { TRACKING_STEPS } from "@/constants";

export function formatStatusLabel(status: string, statusIndex?: number) {
  if (typeof statusIndex === "number" && TRACKING_STEPS[statusIndex]) {
    return TRACKING_STEPS[statusIndex];
  }
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatPaymentLabel(paymentStatus?: string | null) {
  if (paymentStatus === "paid") return "Paid";
  if (paymentStatus === "pending") return "Payment pending";
  return "Pay after cleaning";
}

/** Delivery deadline from booking time + ETA hours. */
export function getEstimatedDelivery(createdAt: string | Date, etaHours: number | null) {
  if (etaHours === null || etaHours === undefined) {
    return {
      at: null as Date | null,
      label: "After inspection",
      remainingLabel: "Quoted after inspection",
      isOverdue: false,
      isDeliveredWindowPassed: false,
    };
  }

  const created = new Date(createdAt);
  const at = new Date(created.getTime() + etaHours * 60 * 60 * 1000);
  const now = new Date();
  const diffMs = at.getTime() - now.getTime();
  const isOverdue = diffMs < 0;

  const absMins = Math.abs(Math.round(diffMs / 60000));
  const hours = Math.floor(absMins / 60);
  const mins = absMins % 60;

  let remainingLabel: string;
  if (isOverdue) {
    if (hours >= 1) remainingLabel = `Expected ${hours}h ${mins}m ago`;
    else remainingLabel = `Expected ${mins}m ago`;
  } else if (hours >= 1) {
    remainingLabel = `${hours}h ${mins}m left`;
  } else {
    remainingLabel = `${mins}m left`;
  }

  const label = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(at);

  return {
    at,
    label,
    remainingLabel,
    isOverdue,
    isDeliveredWindowPassed: isOverdue,
  };
}

export function formatBookedAt(createdAt: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(createdAt));
}
