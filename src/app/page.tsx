import { Comparison } from "@/components/landing/comparison";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SpeedUsp } from "@/components/landing/speed-usp";
import { Stats } from "@/components/landing/stats";
import { Testimonials } from "@/components/landing/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <SpeedUsp />
      <Features />
      <Comparison />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  );
}
