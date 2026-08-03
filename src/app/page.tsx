import { FAQ } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FAQ />
    </>
  );
}
