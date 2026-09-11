import { notFound } from "next/navigation";

import { getCategories } from "@/lib/categories";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { getProductById } from "@/lib/getProduct";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);
  console.log(product);

  if (!product) {
    notFound();
  }

  return (
    <ProductForm
      mode="edit"
      initialData={product}
      categories={categories}
      key={id}
    />
  );
}
