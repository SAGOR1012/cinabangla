import Image from "next/image";
import { Icon } from "./icons";
import { categories } from "@/data/categories";

// Renders a product image, or an icon panel when no photo exists yet.
export default function ProductVisual({ product, src, sizes = "(min-width:1024px) 25vw, 50vw", priority = false, className = "" }) {
  const img = src ?? product.image;
  const cat = categories.find((c) => c.id === product.category);
  const cover = img && img.endsWith("mileage-square.jpg");
  return (
    <div className={`relative aspect-square w-full overflow-hidden bg-mist ${className}`}>
      {img ? (
        <Image
          src={img}
          alt={`${product.name}${product.subtitle ? ", " + product.subtitle : ""}`}
          fill
          sizes={sizes}
          priority={priority}
          className={cover ? "object-cover" : "object-contain p-5 sm:p-6"}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-brand-blue/70">
          <Icon name={cat?.icon} size={56} strokeWidth={1.25} aria-hidden />
          <span className="text-xs font-medium text-ink/50">Photo coming soon</span>
        </div>
      )}
    </div>
  );
}
