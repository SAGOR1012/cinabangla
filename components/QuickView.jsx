"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ProductVisual from "./ProductVisual";
import Rating from "./Rating";
import Price from "./Price";
import { stockLabel } from "@/lib/format";
import { useStore } from "@/context/StoreContext";

export default function QuickView({ product, open, onClose }) {
  const { addToCart } = useStore();
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[65] grid place-items-center bg-ink/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`} onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-white shadow-lift md:grid-cols-2">
            <button onClick={onClose} aria-label="Close quick view" className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded bg-white/90 hover:bg-mist"><X size={20} /></button>
            <ProductVisual product={product} sizes="400px" />
            <div className="flex flex-col p-6">
              <h2 className="font-display text-3xl font-bold">{product.name}</h2>
              {product.subtitle && <p className="text-sm text-ink/60">{product.subtitle}</p>}
              <div className="mt-3"><Rating value={product.rating} /></div>
              <div className="mt-3"><Price product={product} large /></div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{product.short}</p>
              <p className={`mt-3 text-sm font-semibold ${product.stock === "out" ? "text-brand-red" : "text-green-700"}`}>{stockLabel[product.stock]}</p>
              <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
                <button className="btn-red flex-1" disabled={product.stock === "out"} onClick={() => { addToCart(product.id); onClose(); }}>Add to Cart</button>
                <Link href={`/products/${product.id}`} onClick={onClose} className="btn-outline flex-1">View Details</Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
