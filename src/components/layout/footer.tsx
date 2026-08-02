import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = [
  { href: "/#features", label: "About" },
  { href: "/#faq", label: "Privacy" },
  { href: "/#faq", label: "Terms" },
  { href: "mailto:hello@shoeswift.in", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            ShoeSwift
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Shoes, slippers, sandals &amp; more — cleaned in 8–10 hours.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-4 text-sm font-medium text-muted-foreground">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ShoeSwift. All rights reserved.
      </div>
    </footer>
  );
}
