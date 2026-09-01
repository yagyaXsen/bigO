"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function ParallaxDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[600px] md:h-[1064px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 h-[140%] -top-[20%] w-full">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2800"
          alt="Office space parallax"
          fill
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
