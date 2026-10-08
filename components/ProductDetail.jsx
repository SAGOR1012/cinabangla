"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, ShoppingCart, Phone } from "lucide-react";
import Rating from "./Rating";
import Price from "./Price";
import ProductVisual from "./ProductVisual";
import { discountPercent, stockLabel } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { site } from "@/data/site";

export default function ProductDetail({ product, categoryName }) {
  const { addToCart, toggleWish, wishlist } = useStore();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const gallery = product.images?.length ? product.images : [null];
  const [active, setActive] = useState(0);
  const out = product.stock === "out";
  const off = discountPercent(product);
  const hero = product.featured;
  const wide = gallery[active]?.endsWith("mileage-power.jpg");

  return (
    <div className="container-x grid gap-10 py-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <div className={`relative border border-line ${hero ? "bg-ink" : "bg-mist"}`}>
          {wide ? (
            <div className="relative aspect-[16/10]"><Image src={gallery[active]} alt={`${product.name} ${product.subtitle}`} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /></div>
          ) : (
            <ProductVisual product={product} src={gallery[active] || undefined} priority sizes="(min-width:1024px) 50vw, 100vw" />
          )}
          {off > 0 && <span className="absolute left-0 top-4 bg-brand-red px-3 py-1.5 text-sm font-bold text-white">-{off}%</span>}
        </div>
        {gallery.length > 1 && (
          <div className="mt-3 flex gap-3">
            {gallery.map((g, i) => (
              <button key={g} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-current={i === active}
                className={`relative h-20 w-24 overflow-hidden border-2 bg-mist ${i === active ? "border-brand-red" : "border-line hover:border-brand-blue"}`}>
                <Image src={g} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-brand-blue">{categoryName}</p>
        <h1 className="mt-1 font-display text-4xl font-extrabold md:text-5xl">{product.name}</h1>
        {product.subtitle && <p className="mt-1 text-lg text-ink/60">{product.subtitle}</p>}
        <div className="mt-3"><Rating value={product.rating} size={18} /></div>
        <div className="mt-5"><Price product={product} large /></div>
        <p className={`mt-3 text-sm font-semibold ${out ? "text-brand-red" : "text-green-700"}`}>● {stockLabel[product.stock]}</p>
        <p className="mt-5 leading-relaxed text-ink/75">{product.description}</p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-line" role="group" aria-label="Quantity">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-12 w-12 place-items-center hover:bg-mist"><Minus size={16} /></button>
            <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="grid h-12 w-12 place-items-center hover:bg-mist"><Plus size={16} /></button>
          </div>
          <button className="btn-outline !py-3.5 flex-1" disabled={out} onClick={() => addToCart(product.id, qty)}><ShoppingCart size={16} /> Add to Cart</button>
          <button className="btn-red !py-3.5 flex-1" disabled={out} onClick={() => { addToCart(product.id, qty); router.push("/checkout"); }}>Buy Now</button>
          <button className="btn-outline !px-3.5 !py-3.5" onClick={() => toggleWish(product.id)} aria-pressed={wishlist.includes(product.id)} aria-label="Toggle wishlist">
            <Heart size={18} className={wishlist.includes(product.id) ? "fill-brand-red text-brand-red" : ""} />
          </button>
        </div>
        <a href={`tel:${site.phone}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"><Phone size={16} /> Order by phone: {site.phone}</a>

        <h2 className="mt-9 font-display text-2xl font-bold">Specifications</h2>
        <dl className="mt-3 border border-line">
          {product.specs.map(([k, v], i) => (
            <div key={k} className={`grid grid-cols-5 gap-3 px-4 py-3 text-sm ${i % 2 ? "bg-white" : "bg-mist"}`}>
              <dt className="col-span-2 font-semibold">{k}</dt><dd className="col-span-3 text-ink/75">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
