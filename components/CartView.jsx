"use client";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import ProductVisual from "./ProductVisual";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/context/StoreContext";

export default function CartView() {
  const { items, total, setQty, removeFromCart, ready } = useStore();
  if (!ready) return <div className="container-x py-20 text-center text-ink/60">Loading cart…</div>;
  if (!items.length)
    return (
      <div className="container-x py-20 text-center">
        <ShoppingBag size={56} strokeWidth={1.25} className="mx-auto text-brand-blue" />
        <h2 className="mt-4 font-display text-3xl font-bold">Your cart is empty</h2>
        <p className="mt-1 text-ink/60">Add a battery or charger to get started.</p>
        <Link href="/products" className="btn-red mt-6">Browse products</Link>
      </div>
    );
  const delivery = 0;
  return (
    <div className="container-x grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <ul className="divide-y divide-line border border-line">
        {items.map(({ product: p, qty }) => (
          <li key={p.id} className="flex gap-4 p-4">
            <Link href={`/products/${p.id}`} className="w-24 shrink-0 sm:w-32"><ProductVisual product={p} sizes="128px" /></Link>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between gap-3">
                <div><Link href={`/products/${p.id}`} className="font-display text-xl font-bold hover:text-brand-red">{p.name}</Link><p className="text-sm text-ink/55">{p.subtitle}</p></div>
                <button onClick={() => removeFromCart(p.id)} aria-label={`Remove ${p.name}`} className="h-9 w-9 shrink-0 text-ink/50 hover:text-brand-red"><Trash2 size={18} className="mx-auto" /></button>
              </div>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                <div className="flex items-center border border-line" role="group" aria-label={`Quantity for ${p.name}`}>
                  <button onClick={() => setQty(p.id, qty - 1)} disabled={qty <= 1} aria-label="Decrease" className="grid h-9 w-9 place-items-center hover:bg-mist disabled:opacity-40"><Minus size={14} /></button>
                  <span className="w-9 text-center text-sm font-semibold">{qty}</span>
                  <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase" className="grid h-9 w-9 place-items-center hover:bg-mist"><Plus size={14} /></button>
                </div>
                <span className="font-display text-2xl font-bold text-brand-red">{formatPrice(p.price * qty)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit border border-line bg-mist p-6 lg:sticky lg:top-32" aria-label="Order summary">
        <h2 className="font-display text-2xl font-bold">Order Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(total)}</dd></div>
          <div className="flex justify-between"><dt>Delivery</dt><dd className="text-ink/60">Confirmed by phone</dd></div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-line pt-4 font-display text-2xl font-bold"><span>Total</span><span className="text-brand-red">{formatPrice(total + delivery)}</span></div>
        <Link href="/checkout" className="btn-red mt-5 w-full !py-3.5">Proceed to Checkout</Link>
        <Link href="/products" className="mt-3 block text-center text-sm font-semibold text-brand-blue hover:underline">Continue shopping</Link>
      </aside>
    </div>
  );
}
