import { STORAGE_KEYS } from "@/constants";
import type { OrderRecord, ShoeAnalysis } from "@/types";

export function saveAnalysis(analysis: ShoeAnalysis, previewImage?: string) {
  sessionStorage.setItem(STORAGE_KEYS.analysis, JSON.stringify(analysis));
  if (analysis.assessmentId) {
    sessionStorage.setItem(STORAGE_KEYS.assessmentId, analysis.assessmentId);
  }
  if (previewImage) {
    sessionStorage.setItem(STORAGE_KEYS.preview, previewImage);
  }
}

export function loadAnalysis(): ShoeAnalysis | null {
  const raw = sessionStorage.getItem(STORAGE_KEYS.analysis);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ShoeAnalysis;
    const assessmentId = sessionStorage.getItem(STORAGE_KEYS.assessmentId);
    if (assessmentId && !parsed.assessmentId) {
      parsed.assessmentId = assessmentId;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function loadPreview(): string | null {
  return sessionStorage.getItem(STORAGE_KEYS.preview);
}

export function loadAssessmentId(): string | null {
  return sessionStorage.getItem(STORAGE_KEYS.assessmentId);
}

export function saveOrder(order: OrderRecord) {
  sessionStorage.setItem(STORAGE_KEYS.order, JSON.stringify(order));
  localStorage.setItem(STORAGE_KEYS.order, JSON.stringify(order));
}

export function loadOrder(id?: string): OrderRecord | null {
  const fromSession = sessionStorage.getItem(STORAGE_KEYS.order);
  const fromLocal = localStorage.getItem(STORAGE_KEYS.order);
  const raw = fromSession || fromLocal;
  if (!raw) return null;
  try {
    const order = JSON.parse(raw) as OrderRecord;
    if (id && order.id !== id) return null;
    return order;
  } catch {
    return null;
  }
}

export function saveCouponApplied(applied: boolean) {
  sessionStorage.setItem(
    STORAGE_KEYS.couponApplied,
    applied ? "1" : "0"
  );
}

export function loadCouponApplied(): boolean {
  return sessionStorage.getItem(STORAGE_KEYS.couponApplied) === "1";
}

export function clearAnalysis() {
  sessionStorage.removeItem(STORAGE_KEYS.analysis);
  sessionStorage.removeItem(STORAGE_KEYS.preview);
  sessionStorage.removeItem(STORAGE_KEYS.assessmentId);
  sessionStorage.removeItem(STORAGE_KEYS.couponApplied);
}
