import { FAQ } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { OfferBanner } from "@/components/landing/offer-banner";
import { Pricing } from "@/components/landing/pricing";
import { Results } from "@/components/landing/results";
import { SpeedUsp } from "@/components/landing/speed-usp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferBanner />
      <SpeedUsp />
      <Pricing />
      <Results />
      <HowItWorks />
      <FAQ />
    </>
  );
}
