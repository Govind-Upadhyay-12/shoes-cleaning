import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Plugzzy Clean — Cleaned in 8–10 Hours | Footwear Cleaning",
  description:
    "2–3× faster than typical shoe cleaning. Instant dirt & delivery estimates. Shoes, slippers & sandals back in 8–10 hours — not 24–48.",
  applicationName: "Plugzzy Clean",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", geist.variable)}>
      <body className="min-h-full font-sans antialiased">
        <ClerkProvider>
          <Providers>
            <div className="flex min-h-full flex-col bg-background">
              <Navbar />
              <main className="flex-1 pb-24 md:pb-0">{children}</main>
              <Footer />
              <MobileStickyCta />
            </div>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
