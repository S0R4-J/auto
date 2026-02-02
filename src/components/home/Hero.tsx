"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex h-[90vh] items-center justify-center overflow-hidden text-white">
      {/* Background - Placeholder for video/image */}
      <div className="absolute inset-0 z-0">
        {/* В реальном проекте здесь будет <video> или <Image> */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      <div className="container relative z-10 px-4 text-center md:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Аренда авто,
          <br />
          которые вдохновляют
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-8 max-w-[600px] text-lg text-gray-300 md:text-xl"
        >
          Премиальный сервис, лучшие автомобили и незабываемые эмоции.
          Без компромиссов.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button asChild size="lg" className="rounded-full px-8 text-lg">
            <Link href="#catalog">Выбрать авто</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
