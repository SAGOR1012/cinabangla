"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { site } from "@/data/site";

const payments = [
  { id: "cod", label: "Cash on Delivery", hint: "Pay when you receive your order" },
  { id: "mobile", label: "bKash / Nagad", hint: "We will confirm payment details by phone" },
];

export default function CheckoutForm() {
  const { items, total, clearCart, ready } = useStore();
  const [done, setDone] = useState(null);
  const [pay, setPay] = useState("cod");

  const submit = (e) => {
    e.preventDefault();
    // TODO: POST { customer, items, payment } to your orders API / MongoDB.
    setDone({ ref: "CBPT-" + Date.now().toString().slice(-6), total });
    clearCart();
  };

  if (!ready) return <div className="container-x py-20 text-center text-ink/60">Loading…</div>;
  if (done)
    return (
      <div className="container-x py-20 text-center" role="status">
        <CheckCircle2 size={56} className="mx-auto text-green-600" />
        <h2 className="mt-4 font-display text-4xl font-bold">Order received</h2>
        <p className="mt-2 text-ink/70">Reference {done.ref} · {formatPrice(done.total)}</p>
        <p className="mt-1 text-ink/70">We will call you to confirm delivery. Questions? Call <a className="font-semibold text-brand-blue" href={`tel:${site.phone}`}>{site.phone}</a>.</p>
        <Link href="/products" className="btn-red mt-6">Continue shopping</Link>
      </div>
    );
  if (!items.length)
    return (<div className="container-x py-20 text-center"><p className="text-ink/70">Your cart is empty.</p><Link href="/products" className="btn-red mt-5">Browse products</Link></div>);

  return (
    <form onSubmit={submit} className="container-x grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 font-display text-2xl font-bold">Delivery details</legend>
          <label className="text-sm font-semibold">Full name<input required name="name" autoComplete="name" className="field mt-1.5 font-normal" /></label>
          <label className="text-sm font-semibold">Mobile number<input required name="phone" type="tel" inputMode="tel" pattern="01[3-9][0-9]{8}" title="11-digit Bangladeshi mobile number, e.g. 01335219984" autoComplete="tel" className="field mt-1.5 font-normal" /></label>
          <label className="text-sm font-semibold sm:col-span-2">Email (optional)<input name="email" type="email" autoComplete="email" className="field mt-1.5 font-normal" /></label>
          <label className="text-sm font-semibold">District<input required name="district" defaultValue="Dhaka" className="field mt-1.5 font-normal" /></label>
          <label className="text-sm font-semibold">Area / Thana<input required name="area" className="field mt-1.5 font-normal" /></label>
          <label className="text-sm font-semibold sm:col-span-2">Full address<textarea required name="address" rows={3} autoComplete="street-address" className="field mt-1.5 font-normal" /></label>
          <label className="text-sm font-semibold sm:col-span-2">Order note (optional)<input name="note" className="field mt-1.5 font-normal" /></label>
        </fieldset>
        <fieldset>
          <legend className="mb-3 font-display text-2xl font-bold">Payment method</legend>
          <div className="space-y-2">
            {payments.map((p) => (
              <label key={p.id} className={`flex cursor-pointer items-start gap-3 border p-4 ${pay === p.id ? "border-brand-blue bg-brand-bluelight" : "border-line"}`}>
                <input type="radio" name="payment" checked={pay === p.id} onChange={() => setPay(p.id)} className="mt-1 accent-brand-red" />
                <span><span className="block font-semibold">{p.label}</span><span className="text-sm text-ink/60">{p.hint}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <aside className="h-fit border border-line bg-mist p-6 lg:sticky lg:top-32" aria-label="Order summary">
        <h2 className="font-display text-2xl font-bold">Your order</h2>
        <ul className="mt-4 divide-y divide-line text-sm">
          {items.map(({ product: p, qty }) => (
            <li key={p.id} className="flex justify-between gap-3 py-2.5"><span>{p.name} × {qty}</span><span className="shrink-0 font-semibold">{formatPrice(p.price * qty)}</span></li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-line pt-4 font-display text-2xl font-bold"><span>Total</span><span className="text-brand-red">{formatPrice(total)}</span></div>
        <p className="mt-1 text-xs text-ink/55">Delivery charge is confirmed by phone.</p>
        <button className="btn-red mt-5 w-full !py-3.5">Place Order</button>
      </aside>
    </form>
  );
}
