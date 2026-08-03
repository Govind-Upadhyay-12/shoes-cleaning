import { FAQ } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Results } from "@/components/landing/results";
import { SpeedUsp } from "@/components/landing/speed-usp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SpeedUsp />
      <Pricing />
      <Results />
      <HowItWorks />
      <FAQ />
    </>
  );
}
