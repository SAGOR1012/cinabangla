import PageHeader from "@/components/PageHeader";
import CategoryCard from "@/components/CategoryCard";
import { getCategories } from "@/lib/api";

export const metadata = {
  title: "Product Categories",
  description: "Automotive, water and dry batteries, chargers, solar products and power accessories.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <>
      <PageHeader title="Categories" subtitle="Find the right power solution for your vehicle, home or business." crumbs={[{ label: "Categories" }]} />
      <div className="container-x grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
      </div>
    </>
  );
}
