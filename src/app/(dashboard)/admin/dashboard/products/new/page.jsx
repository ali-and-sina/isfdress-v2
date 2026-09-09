import ProductForm from "@/components/dashboard/products/ProductForm";
import { getCategories } from "@/lib/categories";

export default async function NewProductPage() {
  const categories = await getCategories();

  return <ProductForm mode="create" categories={categories} />;
}
