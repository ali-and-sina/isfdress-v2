import { notFound } from "next/navigation";
import ProductForm from "@/components/dashboard/ProductForm";
import { db } from "@/lib/db";

export default async function EditProductPage({ params }) {
  const product = await db.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) notFound();

  return <ProductForm initialData={product} productId={product.id} />;
}
