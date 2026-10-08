import { formatPrice } from "@/lib/format";
export default function Price({ product, large = false }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-display font-bold text-brand-red ${large ? "text-4xl" : "text-xl"}`}>{formatPrice(product.price)}</span>
      {product.oldPrice && <span className={`text-ink/45 line-through ${large ? "text-base" : "text-sm"}`}>{formatPrice(product.oldPrice)}</span>}
    </div>
  );
}
