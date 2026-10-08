"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "@/data/site";

const themes = {
  light: { bg: "bg-mist", text: "text-ink", sub: "text-ink/70", btn: "btn-red" },
  dark: { bg: "bg-ink", text: "text-white", sub: "text-white/75", btn: "btn-red" },
  blue: { bg: "bg-brand-bluedark", text: "text-white", sub: "text-white/80", btn: "btn-white" },
};

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n) => setI((n + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const s = slides[i];
  const t = themes[s.theme];

  return (
    <section aria-roledescription="carousel" aria-label="Promotions" className="container-x py-6 md:py-10"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={`relative overflow-hidden transition-colors duration-500 ${t.bg}`}>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}
            aria-live="polite" className="grid min-h-[460px] items-center gap-6 md:min-h-[400px] md:grid-cols-2">
            <div className="relative z-10 p-7 pb-0 sm:p-10 md:p-14 md:pb-14">
              <h2 className={`font-display text-4xl font-extrabold leading-none sm:text-5xl lg:text-6xl ${t.text}`}>{s.title}</h2>
              <p className={`mt-4 max-w-md text-lg ${t.sub}`}>{s.subtitle}</p>
              <Link href={s.cta.href} className={`${t.btn} mt-7 !px-7 !py-3.5`}>{s.cta.label}</Link>
            </div>
            <div className="relative h-[220px] md:h-full md:min-h-[400px]">
              {s.images.length === 1 ? (
                <Image src={s.images[0].src} alt={s.images[0].alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover object-center" />
              ) : (
                <div className="flex h-full items-center justify-center gap-2 px-4 md:gap-4">
                  {s.images.map((im, k) => (
                    <div key={im.src + k} className={`relative ${s.images.length === 3 ? "h-[85%] w-1/3" : "h-[90%] w-1/2"} ${k === 1 && s.images.length === 3 ? "scale-110" : ""}`}>
                      <Image src={im.src} alt={im.alt} fill sizes="(min-width:768px) 20vw, 33vw" className="object-contain drop-shadow-xl" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-7 z-20 flex gap-2 sm:left-10 md:left-14">
          {slides.map((_, n) => (
            <button key={n} onClick={() => go(n)} aria-label={`Go to slide ${n + 1}`} aria-current={n === i}
              className={`h-2 transition-all ${n === i ? "w-8 bg-brand-red" : `w-2 ${s.theme === "light" ? "bg-ink/30" : "bg-white/50"}`}`} />
          ))}
        </div>
        <div className="absolute bottom-3 right-3 z-20 flex gap-2">
          <button onClick={() => go(i - 1)} aria-label="Previous slide" className="grid h-10 w-10 place-items-center border border-line bg-white text-ink hover:bg-brand-red hover:text-white"><ChevronLeft size={20} /></button>
          <button onClick={() => go(i + 1)} aria-label="Next slide" className="grid h-10 w-10 place-items-center border border-line bg-white text-ink hover:bg-brand-red hover:text-white"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}
