"use client";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, ShoppingCart } from "lucide-react";
import Rating from "./Rating";
import Price from "./Price";
import Reveal from "./Reveal";
import { discountPercent, stockLabel } from "@/lib/format";
import { useStore } from "@/context/StoreContext";

export default function FeaturedProduct({ product }) {
  const { addToCart, toggleWish, wishlist } = useStore();
  const off = discountPercent(product);
  return (
    <section className="section bg-mist" aria-labelledby="featured-title">
      <div className="container-x">
        <Reveal>
          <h2 id="featured-title" className="h-section">Featured Product</h2>
          <p className="mt-2 text-ink/65">Discover our trusted power solutions.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 grid overflow-hidden border border-line bg-white shadow-card lg:grid-cols-5">
          <div className="relative min-h-[300px] bg-ink lg:col-span-3 lg:min-h-[480px]">
            <Image src="/images/mileage-power.jpg" alt="Mileage Power 400Ah dry battery" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
            {off > 0 && <span className="absolute left-0 top-5 bg-brand-red px-3 py-1.5 text-sm font-bold text-white">Save {off}%</span>}
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-2">
            <p className="text-sm font-semibold text-brand-blue">Flagship dry battery</p>
            <h3 className="mt-1 font-display text-5xl font-extrabold">{product.name}</h3>
            <p className="text-lg text-ink/60">{product.subtitle}</p>
            <div className="mt-4"><Rating value={product.rating} size={18} /></div>
            <p className="mt-4 leading-relaxed text-ink/70">{product.short}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {["High performance", "Long life", "Maintenance free"].map((f) => <li key={f} className="flex items-center gap-2"><Check size={16} className="text-brand-red" />{f}</li>)}
            </ul>
            <p className="mt-5 text-sm font-semibold text-green-700">● {stockLabel[product.stock]}</p>
            <div className="mt-2"><Price product={product} large /></div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/products/${product.id}`} className="btn-blue flex-1">View Details</Link>
              <button className="btn-red flex-1" onClick={() => addToCart(product.id)}><ShoppingCart size={16} /> Add to Cart</button>
              <button className="btn-outline !px-3.5" onClick={() => toggleWish(product.id)} aria-pressed={wishlist.includes(product.id)} aria-label="Toggle wishlist">
                <Heart size={18} className={wishlist.includes(product.id) ? "fill-brand-red text-brand-red" : ""} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
