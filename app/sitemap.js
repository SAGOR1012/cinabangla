import { site } from "@/data/site";
import { getProducts } from "@/lib/api";
export default async function sitemap() {
  const products = await getProducts();
  const pages = ["", "/products", "/categories", "/about", "/contact"].map((p) => ({ url: `${site.url}${p}` }));
  return [...pages, ...products.map((p) => ({ url: `${site.url}/products/${p.id}` }))];
}
