import CategoryForm from "@/components/dashboard/categories/CategoryForm";
import { getCategories } from "@/lib/categories";

export default async function Page() {
  const categories = await getCategories();

  const parentCategories = categories.filter(
    (category) => category.parent_id === null,
  );

  return <CategoryForm mode="create" parentCategories={parentCategories} />;
}
