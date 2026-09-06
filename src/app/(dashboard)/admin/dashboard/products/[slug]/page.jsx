import { notFound } from "next/navigation";

import { getCategories } from "@/lib/categories";
import { getProductById } from "@/lib/products";
import ProductForm from "@/components/dashboard/products/ProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <ProductForm mode="edit" initialData={product} categories={categories} />
  );
}
