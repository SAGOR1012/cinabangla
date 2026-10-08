// Data access layer. Every function is async so you can swap in fetch()/MongoDB
// without touching any page or component.
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export async function getProducts() { return products; }
export async function getProductById(id) { return products.find((p) => p.id === id) || null; }
export async function getFeaturedProduct() { return products.find((p) => p.featured) || products[0]; }
export async function getCategories() { return categories; }
export async function getRelatedProducts(product, limit = 4) {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const rest = products.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...same, ...rest].slice(0, limit);
}
