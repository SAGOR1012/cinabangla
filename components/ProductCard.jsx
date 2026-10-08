"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import ProductVisual from "./ProductVisual";
import Rating from "./Rating";
import Price from "./Price";
import QuickView from "./QuickView";
import { categories } from "@/data/categories";
import { discountPercent } from "@/lib/format";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product, priority = false }) {
  const { addToCart, toggleWish, wishlist } = useStore();
  const [qv, setQv] = useState(false);
  const liked = wishlist.includes(product.id);
  const off = discountPercent(product);
  const cat = categories.find((c) => c.id === product.category);

  return (
    <motion.article whileHover={{ y: -3 }} transition={{ duration: 0.15 }} className="group flex flex-col border border-line bg-white shadow-card transition-shadow hover:shadow-lift">
      <div className="relative">
        <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}><ProductVisual product={product} priority={priority} /></Link>
        {off > 0 && <span className="absolute left-0 top-3 bg-brand-red px-2.5 py-1 text-xs font-bold text-white">-{off}%</span>}
        {product.stock === "out" && <span className="absolute left-0 top-3 bg-ink px-2.5 py-1 text-xs font-bold text-white">Sold out</span>}
        <button onClick={() => toggleWish(product.id)} aria-pressed={liked} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white shadow-card hover:text-brand-red">
          <Heart size={18} className={liked ? "fill-brand-red text-brand-red" : ""} />
        </button>
        <button onClick={() => setQv(true)} className="absolute inset-x-0 bottom-0 hidden items-center justify-center gap-2 bg-ink/90 py-2.5 text-sm font-semibold text-white group-hover:flex focus-visible:flex max-lg:!hidden">
          <Eye size={16} /> Quick View
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold text-brand-blue">{cat?.name}</span>
        <h3 className="mt-1 font-display text-xl font-bold leading-tight"><Link href={`/products/${product.id}`} className="hover:text-brand-red">{product.name}</Link></h3>
        {product.subtitle && <p className="text-sm text-ink/55">{product.subtitle}</p>}
        <div className="mt-2"><Rating value={product.rating} /></div>
        <div className="mt-2"><Price product={product} /></div>
        <div className="mt-auto flex gap-2 pt-4">
          <button className="btn-red flex-1 !px-3" disabled={product.stock === "out"} onClick={() => addToCart(product.id)}><ShoppingCart size={16} /> Add to Cart</button>
          <button className="btn-outline !px-3 lg:hidden" onClick={() => setQv(true)} aria-label={`Quick view ${product.name}`}><Eye size={16} /></button>
        </div>
      </div>
      <QuickView product={product} open={qv} onClose={() => setQv(false)} />
    </motion.article>
  );
}
