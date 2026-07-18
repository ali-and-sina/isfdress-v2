import ProductDetails from "@/components/product/ProductDetails";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const products = await getProducts();
  const { name } = products.find((product) => product.slug === slug);
  return { title: `فروشگاه اینترنتی لاکس | ${name}` };
}
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();
  const session = await auth();
  const user = session?.user;
  const product = products.find((product) => product.slug === slug);
  return <ProductDetails product={product} user={user} />;
}
