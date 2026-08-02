import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/constants";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  /** Full wordmark logo vs icon mark only */
  variant?: "full" | "mark";
  /** Where the logo sits — controls default size */
  size?: "nav" | "footer" | "lg";
  priority?: boolean;
};

const FULL_SIZES = {
  nav: "h-12 w-auto max-w-[13rem] sm:h-14 sm:max-w-[16rem] md:h-[3.75rem] md:max-w-[18rem]",
  footer: "h-14 w-auto max-w-[16rem] sm:h-16 sm:max-w-[18rem]",
  lg: "h-16 w-auto sm:h-20",
} as const;

const MARK_SIZES = {
  nav: "h-11 w-11 sm:h-12 sm:w-12",
  footer: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

export function BrandLogo({
  href = "/",
  className,
  variant = "full",
  size = "nav",
  priority = false,
}: BrandLogoProps) {
  const isFull = variant === "full";

  const image = (
    <Image
      src={
        isFull
          ? "/images/plugzzy-clean-logo.png"
          : "/images/plugzzy-clean-mark.png"
      }
      alt={BRAND.name}
      width={isFull ? 820 : 256}
      height={isFull ? 346 : 256}
      priority={priority}
      className={cn(
        "object-contain object-left",
        isFull ? FULL_SIZES[size] : MARK_SIZES[size],
        className
      )}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center"
      aria-label={BRAND.name}
    >
      {image}
    </Link>
  );
}
