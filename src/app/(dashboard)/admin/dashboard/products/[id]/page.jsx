import { notFound } from "next/navigation";

import { getCategories } from "@/lib/categories";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { getProduct } from "@/lib/getProduct";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProduct(id),
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
