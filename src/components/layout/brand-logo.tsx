import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/constants";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  /** Icon mark (header) vs slightly larger mark */
  size?: "nav" | "footer" | "lg";
  priority?: boolean;
  /** Show brand name text next to the icon */
  withName?: boolean;
};

const SIZES = {
  nav: "h-11 w-11 sm:h-12 sm:w-12",
  footer: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

export function BrandLogo({
  href = "/",
  className,
  size = "nav",
  priority = false,
  withName = true,
}: BrandLogoProps) {
  const image = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/images/plugzzy-clean-mark.png"
        alt=""
        width={256}
        height={256}
        priority={priority}
        className={cn("object-contain", SIZES[size])}
      />
      {withName && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight text-[#0B1B3A] sm:text-lg">
            Plugzzy
          </span>
          <span className="bg-gradient-to-r from-[#1D6FE8] to-[#0B4FCC] bg-clip-text text-sm font-bold tracking-tight text-transparent sm:text-[0.95rem]">
            Clean
          </span>
        </span>
      )}
    </span>
  );

  if (!href) {
    return (
      <span className="inline-flex items-center" aria-label={BRAND.name}>
        {image}
      </span>
    );
  }

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
