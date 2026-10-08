import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import ProductsBrowser from "@/components/ProductsBrowser";
import { getCategories, getProducts } from "@/lib/api";

export const metadata = {
  title: "All Products",
  description: "Browse batteries, chargers, solar products and accessories from China Bangla Power Tech.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return (
    <>
      <PageHeader title="All Products" subtitle="Batteries, chargers, solar and power accessories." crumbs={[{ label: "Products" }]} />
      <Suspense fallback={<div className="container-x py-20 text-center text-ink/60">Loading products…</div>}>
        <ProductsBrowser products={products} categories={categories} />
      </Suspense>
    </>
  );
}
