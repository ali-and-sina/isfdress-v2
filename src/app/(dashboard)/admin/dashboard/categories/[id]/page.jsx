import CategoryForm from "@/components/dashboard/categories/CategoryForm";
import { getCategories, getCategoryById } from "@/lib/categories";

export default async function EditCategoryPage({ params }) {
  const { id } = await params;

  const category = await getCategoryById(id);

  if (!category) {
    return <div>دسته‌بندی پیدا نشد.</div>;
  }

  const categories = await getCategories();

  const parentCategories = categories.filter(
    (item) => item.parent_id === null && item.id !== category.id,
  );

  return (
    <CategoryForm
      mode="edit"
      initialData={category}
      parentCategories={parentCategories}
    />
  );
}
