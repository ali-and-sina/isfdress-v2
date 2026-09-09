import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import { getProduct } from "@/lib/getProduct";
import { getCategoryPathByLeafId } from "@/lib/categories";
import { auth } from "@/lib/auth";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "فروشگاه اینترنتی لاکس" };
  return { title: `فروشگاه اینترنتی لاکس | ${product.name}` };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);
  if (!product) notFound();

  const { category, subCategory } = await getCategoryPathByLeafId(
    product.categoryId
  );

  const session = await auth();
  const user = session?.user;

  return (
    <ProductDetails
      product={product}
      category={category}
      subCategory={subCategory}
      user={user}
    />
  );
}