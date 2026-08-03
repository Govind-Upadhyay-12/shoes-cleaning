import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { BRAND } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0B1B3A] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="rounded-xl bg-white/95 px-3 py-2 inline-flex">
            <BrandLogo size="footer" />
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            Fast footwear cleaning from ₹299. Delivered in 6–10 hours — not
            24–48.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-white/70">
          <Link href="/#speed" className="hover:text-white">
            Why faster
          </Link>
          <Link href="/#pricing" className="hover:text-white">
            Prices
          </Link>
          <Link href="/#how" className="hover:text-white">
            How it works
          </Link>
          <Link href="/#faq" className="hover:text-white">
            FAQ
          </Link>
          <a href="mailto:hello@plugzzy.co.in" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/45">
        © {new Date().getFullYear()} {BRAND.name}
      </div>
    </footer>
  );
}
