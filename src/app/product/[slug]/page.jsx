import ProductDetails from "@/components/product/ProductDetails";
import { products } from "@/data/products";

const formatPrice = (price) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((product) => product.slug === slug);
  return <ProductDetails product={product} />;
}
