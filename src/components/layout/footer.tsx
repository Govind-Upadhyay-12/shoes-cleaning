import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { BRAND } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <BrandLogo size="footer" />
          <p className="mt-2 text-sm text-muted-foreground">
            Clean footwear in 6–10 hours.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          <Link href="/#how" className="hover:text-foreground">
            How it works
          </Link>
          <Link href="/#faq" className="hover:text-foreground">
            FAQ
          </Link>
          <a href="mailto:hello@plugzzy.co.in" className="hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BRAND.name}
      </div>
    </footer>
  );
}
