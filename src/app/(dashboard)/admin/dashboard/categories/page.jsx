import Categories from "@/components/dashboard/categories/Categories";
import { getCategories } from "@/lib/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <Categories categories={categories} />;
}
