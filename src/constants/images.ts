export const IMAGES = {
  beforeAfter: "/images/before-after.png",
  cleaningProcess: "/images/cleaning-process.png",
  soleCompare: "/images/sole-clean-compare.png",
  delivery: "/images/doorstep-delivery.png",
  slippersCleaning: "/images/slippers-cleaning.png",
  sandalsCleaning: "/images/sandals-cleaning.png",
} as const;

export const FOOTWEAR_SHOWCASE = [
  { label: "Sneakers", image: IMAGES.beforeAfter, hint: "Deep clean" },
  { label: "Slippers", image: IMAGES.slippersCleaning, hint: "Foam clean" },
  { label: "Sandals", image: IMAGES.sandalsCleaning, hint: "Detail clean" },
  { label: "Soles", image: IMAGES.soleCompare, hint: "Whitening" },
  { label: "Pickup", image: IMAGES.delivery, hint: "Doorstep" },
] as const;
