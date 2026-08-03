/** Bengaluru city pincodes are 560xxx. */
const BENGALURU_PINCODE = /^560\d{3}$/;

export const SERVICE_CITY = {
  name: "Bengaluru",
  nameAlt: "Bangalore",
  state: "Karnataka",
  pincodePrefix: "560",
  pincodeHint: "560001",
  message: "Currently live in Bengaluru only",
} as const;

export function isBengaluruPincode(pincode: string): boolean {
  return BENGALURU_PINCODE.test(pincode.trim());
}

export function bengaluruPincodeError(): string {
  return "We currently serve Bengaluru only (pincode 560xxx).";
}
