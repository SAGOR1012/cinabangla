import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductDetail from "@/components/ProductDetail";
import ProductGrid from "@/components/ProductGrid";
import { getCategories, getProductById, getProducts, getRelatedProducts } from "@/lib/api";
import { site } from "@/data/site";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await getProductById(id);
  if (!p) return {};
  const image = p.images?.[0] || "/images/mileage-power.jpg";
  return {
    title: `${p.name}${p.subtitle ? " " + p.subtitle : ""}`,
    description: p.short,
    alternates: { canonical: `/products/${p.id}` },
    openGraph: { title: p.name, description: p.short, type: "website", images: [{ url: image, alt: p.name }] },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  const [related, categories] = await Promise.all([getRelatedProducts(product), getCategories()]);
  const category = categories.find((c) => c.id === product.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.subtitle || ""}`.trim(),
    description: product.description,
    image: (product.images || []).map((i) => `${site.url}${i}`),
    brand: { "@type": "Brand", name: product.name.split(" ")[0] },
    category: category?.name,
    offers: {
      "@type": "Offer", priceCurrency: "BDT", price: product.price,
      availability: product.stock === "out" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: `${site.url}/products/${product.id}`, seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader title={product.name} crumbs={[{ label: "Products", href: "/products" }, { label: product.name }]} />
      <ProductDetail product={product} categoryName={category?.name} />
      <section className="section border-t border-line bg-mist" aria-labelledby="related-title">
        <div className="container-x">
          <h2 id="related-title" className="h-section mb-8">Related Products</h2>
          <ProductGrid products={related} />
        </div>
      </section>
    </>
  );
}
