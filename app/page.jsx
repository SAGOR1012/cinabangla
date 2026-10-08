import Hero from "@/components/Hero";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProduct from "@/components/FeaturedProduct";
import CategoryCard from "@/components/CategoryCard";
import ProductGrid from "@/components/ProductGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutSection";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { getCategories, getFeaturedProduct, getProducts } from "@/lib/api";

export default async function HomePage() {
  const [categories, featured, products] = await Promise.all([getCategories(), getFeaturedProduct(), getProducts()]);
  return (
    <>
      <Hero />
      <HeroSlider />
      <FeaturedProduct product={featured} />
      <section className="section" aria-labelledby="cat-title">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-3">
            <div><h2 id="cat-title" className="h-section">Shop by Category</h2><p className="mt-2 text-ink/65">Batteries, chargers, solar and accessories.</p></div>
            <Link href="/categories" className="text-sm font-semibold text-brand-blue hover:underline">View all categories</Link>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => <Reveal key={c.id} delay={(i % 3) * 0.06}><CategoryCard category={c} /></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section bg-mist pt-14" aria-labelledby="prod-title">
        <div className="container-x">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <h2 id="prod-title" className="h-section">Our Products</h2>
            <Link href="/products" className="btn-outline">View All Products</Link>
          </Reveal>
          <ProductGrid products={products} />
        </div>
      </section>
      <WhyChooseUs />
      <AboutSection />
      <Stats />
      <CTA />
    </>
  );
}
