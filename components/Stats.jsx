import { stats } from "@/data/site";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function Stats() {
  const computed = { categories: categories.length, products: products.length };
  return (
    <section className="bg-brand-bluedark text-white" aria-label="Company highlights">
      <div className="container-x grid grid-cols-2 gap-y-8 py-12 lg:grid-cols-4">
        {stats.map((s, i) => {
          const value = s.key ? computed[s.key] : s.value;
          const Tag = s.href ? "a" : "div";
          return (
            <Tag key={s.label} href={s.href} className={`px-4 text-center ${i > 0 ? "lg:border-l lg:border-white/20" : ""} ${i % 2 ? "border-l border-white/20" : ""}`}>
              <div className={`font-display font-extrabold leading-none ${String(value).length > 6 ? "text-3xl sm:text-4xl" : "text-5xl sm:text-6xl"}`}>{value}</div>
              <div className="mt-2 text-sm text-white/75">{s.label}</div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
