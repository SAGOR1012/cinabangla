"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "./icons";
import { heroBadges } from "@/data/site";

const positions = ["-left-3 top-[14%] sm:-left-8", "-right-3 top-[44%] sm:-right-8", "left-3 -bottom-4 sm:left-10"];

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden className="absolute right-0 top-0 hidden h-full w-[46%] bg-mist lg:block" />
      <div className="container-x relative grid items-center gap-12 py-12 md:py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="inline-block border-l-4 border-brand-red bg-brand-bluelight px-3 py-1.5 text-xs font-bold tracking-widest text-brand-bluedark">POWER • PERFORMANCE • RELIABILITY</p>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.98] sm:text-6xl xl:text-7xl">
            Powering Your Journey With <span className="text-brand-red">Reliable</span> Energy
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/70">
            Premium battery and power solutions from China Bangla Power Tech, built for dependable performance and long-lasting power.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="btn-red !px-7 !py-3.5 text-base">Shop Products</Link>
            <Link href="/products/mileage-power-400ah" className="btn-outline !px-7 !py-3.5 text-base">Explore Mileage Power</Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl px-3 pb-6 lg:max-w-none">
          <div aria-hidden className="absolute -right-2 -top-4 h-3/4 w-3/4 border-2 border-brand-blue/30" />
          <div aria-hidden className="absolute -bottom-4 -left-2 h-2/3 w-2/3 bg-brand-red" />
          <div aria-hidden className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full bg-brand-red/20 blur-3xl" />
          <motion.div animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative">
            <div className="relative aspect-[16/10] overflow-hidden border border-white bg-white shadow-[0_30px_50px_-20px_rgba(10,20,40,.45)]">
              <Image src="/images/mileage-power.jpg" alt="Mileage Power 400Ah dry battery, power that goes the distance" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            {heroBadges.map((b, i) => (
              <motion.div key={b.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.15 }}
                className={`absolute ${positions[i]} flex items-center gap-2.5 border border-line bg-white px-3.5 py-2.5 shadow-lift`}>
                <span className="grid h-8 w-8 place-items-center bg-brand-red text-white"><Icon name={b.icon} size={16} aria-hidden /></span>
                <span className="text-sm font-bold">{b.label}</span>
              </motion.div>
            ))}
          </motion.div>
          <div aria-hidden className="mx-auto mt-6 h-4 w-3/4 rounded-[50%] bg-ink/25 blur-xl" />
        </div>
      </div>
    </section>
  );
}
