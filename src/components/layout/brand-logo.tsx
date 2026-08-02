import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/constants";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  /** Full wordmark logo vs icon mark only */
  variant?: "full" | "mark";
  priority?: boolean;
};

export function BrandLogo({
  href = "/",
  className,
  variant = "full",
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
      width={isFull ? 220 : 40}
      height={isFull ? 72 : 40}
      priority={priority}
      className={cn(
        "h-auto w-auto object-contain",
        isFull ? "h-9 sm:h-10" : "h-8 w-8",
        className
      )}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label={BRAND.name}
    >
      {image}
    </Link>
  );
}
