"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { AuthBookButton } from "@/components/auth/auth-book-button";
import { IMAGES } from "@/constants/images";

export function OfferBanner() {
  return (
    <section id="offer" className="scroll-mt-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.slippersCleaning}
          alt=""
          fill
          className="object-cover scale-105"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(11,27,58,0.96)_0%,rgba(29,78,216,0.88)_52%,rgba(37,99,235,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100 uppercase backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Limited first-clean offer
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              First cleaning
              <span className="mt-1 block text-blue-200">
                up to 50% off
              </span>
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              Live in Bengaluru only. New customers get 50% off first clean —
              same 6–10 hour delivery. Pay after cleaning.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { was: "₹299", now: "₹149", label: "Basic" },
                { was: "₹399", now: "₹199", label: "Deep" },
                { was: "₹599", now: "₹299", label: "Premium" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2.5 backdrop-blur"
                >
                  <p className="text-[11px] font-medium tracking-wide text-blue-100 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-0.5 flex items-baseline gap-1.5">
                    <span className="text-lg font-semibold text-white">
                      {item.now}
                    </span>
                    <span className="text-xs text-white/45 line-through">
                      {item.was}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <AuthBookButton className="mt-8 h-12 rounded-full bg-white px-7 text-base font-semibold text-[#0B1B3A] hover:bg-blue-50">
              Claim 50% off
              <ArrowRight className="ml-1 h-4 w-4" />
            </AuthBookButton>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative hidden overflow-hidden rounded-[1.75rem] border border-white/15 shadow-2xl shadow-black/30 sm:block lg:min-h-[340px]"
          >
            <div className="relative aspect-[5/4] lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src={IMAGES.beforeAfter}
                alt="First clean offer — before and after footwear cleaning"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 px-4 py-3 text-[#0B1B3A] backdrop-blur">
                <p className="text-sm font-semibold">First order special</p>
                <p className="mt-0.5 text-xs text-[#0B1B3A]/65">
                  Save up to half · still delivered in 6–10 hours
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
