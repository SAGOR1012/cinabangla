"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "./ProductGrid";

export default function ProductsBrowser({ products, categories }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [cat, setCat] = useState(params.get("category") || "all");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState("");
  const [stockOnly, setStockOnly] = useState(false);
  const [show, setShow] = useState(false);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    let r = products.filter((p) =>
      (cat === "all" || p.category === cat) &&
      (!t || `${p.name} ${p.subtitle || ""} ${p.short}`.toLowerCase().includes(t)) &&
      (!maxPrice || p.price <= Number(maxPrice)) &&
      (!stockOnly || p.stock !== "out"));
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [products, q, cat, sort, maxPrice, stockOnly]);

  const reset = () => { setQ(""); setCat("all"); setSort("featured"); setMaxPrice(""); setStockOnly(false); };

  const Filters = (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-display text-xl font-bold">Category</h2>
        <ul className="space-y-1">
          {[{ id: "all", name: "All products" }, ...categories].map((c) => (
            <li key={c.id}>
              <button onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
                className={`w-full border-l-2 px-3 py-2 text-left text-sm ${cat === c.id ? "border-brand-red bg-brand-bluelight font-semibold text-brand-bluedark" : "border-transparent hover:bg-mist"}`}>{c.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <label className="block">
        <span className="mb-2 block font-display text-xl font-bold">Max price (৳)</span>
        <input type="number" min="0" step="500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="e.g. 20000" className="field" />
      </label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={stockOnly} onChange={(e) => setStockOnly(e.target.checked)} className="h-4 w-4 accent-brand-red" /> In stock only</label>
      <button onClick={reset} className="text-sm font-semibold text-brand-blue hover:underline">Clear all filters</button>
    </div>
  );

  return (
    <div className="container-x py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" className="field !pl-10" />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products" className="field sm:w-56">
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top rated</option>
        </select>
        <button className="btn-outline lg:hidden" onClick={() => setShow(true)}><SlidersHorizontal size={16} /> Filters</button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">{Filters}</aside>
        <div>
          <p className="mb-4 text-sm text-ink/60" aria-live="polite">{list.length} {list.length === 1 ? "product" : "products"}</p>
          {list.length ? <ProductGrid products={list} /> : (
            <div className="border border-dashed border-line p-12 text-center">
              <p className="font-display text-2xl font-bold">No products match your filters</p>
              <p className="mt-1 text-ink/60">Try a different search or clear the filters.</p>
              <button onClick={reset} className="btn-blue mt-4">Clear filters</button>
            </div>
          )}
        </div>
      </div>

      {show && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-label="Filters">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setShow(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-white p-5">
            <div className="mb-4 flex items-center justify-between"><span className="font-display text-2xl font-bold">Filters</span><button onClick={() => setShow(false)} aria-label="Close filters"><X /></button></div>
            {Filters}
            <button onClick={() => setShow(false)} className="btn-red mt-6 w-full">Show {list.length} results</button>
          </div>
        </div>
      )}
    </div>
  );
}
