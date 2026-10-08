import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "./icons";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/products?category=${category.id}`} className="group flex flex-col border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        {category.image ? (
          <Image src={category.image} alt={category.name} fill sizes="(min-width:1024px) 30vw, 50vw"
            className={`transition-transform duration-300 group-hover:scale-105 ${category.cover ? "object-cover" : "object-contain p-4"}`} />
        ) : (
          <div className="grid h-full place-items-center bg-brand-bluelight text-brand-blue"><Icon name={category.icon} size={64} strokeWidth={1.25} aria-hidden /></div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center gap-2 font-display text-2xl font-bold"><Icon name={category.icon} size={20} className="text-brand-red" aria-hidden />{category.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{category.description}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-blue">Explore Products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}
