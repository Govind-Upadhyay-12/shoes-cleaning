"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, Home, Sparkles, Zap } from "lucide-react";
import { IMAGES } from "@/constants/images";

const features = [
  {
    icon: Zap,
    title: "2–3× faster cleaning",
    description: "8–10 hours end-to-end. Others still need 24–48 hours.",
    image: IMAGES.beforeAfter,
  },
  {
    icon: Bot,
    title: "Instant time estimate",
    description:
      "Pick footwear type & dirt level. Rules decide Basic / Deep / Premium ETA.",
    image: IMAGES.cleaningProcess,
  },
  {
    icon: Home,
    title: "Same-day doorstep",
    description: "Pickup dirty pairs and return them cleaned the same day.",
    image: IMAGES.delivery,
  },
  {
    icon: Sparkles,
    title: "Deep restoration",
    description: "Mud removal, odor treatment, sole whitening — done properly.",
    image: IMAGES.soleCompare,
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Fast clean. Smart estimate.
        </h2>
        <p className="mt-2 text-muted-foreground">
          Speed is the product — AI tells you the time before you book.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm"
          >
            <div className="relative h-48 w-full sm:h-52">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-primary">
                <feature.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
