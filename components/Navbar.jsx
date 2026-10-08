"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { useStore } from "@/context/StoreContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");
  const { count, ready } = useStore();
  const router = useRouter();

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const submit = (e) => {
    e.preventDefault();
    setSearching(false); setOpen(false);
    router.push(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="hidden bg-brand-bluedark text-xs text-white md:block">
        <div className="container-x flex h-8 items-center justify-between">
          <span>{site.headOfficeShort} · {site.tagline}</span>
          <a href={`tel:${site.phone}`} className="font-semibold hover:underline">Call {site.phone}</a>
        </div>
      </div>
      <div className="container-x flex h-[68px] items-center justify-between gap-4">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Image src="/images/logo.png" alt={`${site.name} logo`} width={900} height={850} priority className="h-14 w-auto md:h-[60px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm font-semibold text-ink/80 transition-colors hover:text-brand-red">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => setSearching((s) => !s)} aria-label="Search products" className="grid h-10 w-10 place-items-center rounded hover:bg-mist"><Search size={20} /></button>
          <Link href="/cart" aria-label={`Cart, ${count} items`} className="relative grid h-10 w-10 place-items-center rounded hover:bg-mist">
            <ShoppingCart size={20} />
            {ready && count > 0 && <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-red px-1 text-[11px] font-bold text-white">{count}</span>}
          </Link>
          <Link href="/products" className="btn-red ml-1 hidden sm:inline-flex">Shop Now</Link>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded hover:bg-mist lg:hidden"><Menu size={22} /></button>
        </div>
      </div>

      <AnimatePresence>
        {searching && (
          <motion.form onSubmit={submit} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-white" role="search">
            <div className="container-x flex gap-2 py-3">
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search batteries, chargers, solar…" className="field" aria-label="Search products" />
              <button className="btn-blue">Search</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside role="dialog" aria-label="Menu" className="fixed right-0 top-0 z-[60] flex h-full w-[84%] max-w-sm flex-col bg-white shadow-lift"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.25 }}>
              <div className="flex items-center justify-between border-b border-line p-4">
                <Image src="/images/logo.png" alt="" width={900} height={850} className="h-14 w-auto" />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded hover:bg-mist"><X size={22} /></button>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-2">
                {navLinks.map((l) => (
                  <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="block border-b border-line px-3 py-4 font-display text-xl font-semibold hover:text-brand-red">{l.label}</Link>
                ))}
              </nav>
              <div className="space-y-2 border-t border-line p-4">
                <Link href="/products" onClick={() => setOpen(false)} className="btn-red w-full">Shop Now</Link>
                <a href={`tel:${site.phone}`} className="btn-outline w-full">Call {site.phone}</a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
