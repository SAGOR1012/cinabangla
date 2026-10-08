import ProductCard from "./ProductCard";
export default function ProductGrid({ products, className = "" }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 2} />)}
    </div>
  );
}
