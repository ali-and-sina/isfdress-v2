import ProductDetails from "@/components/product/ProductDetails";
import { products } from "@/data/products";

const formatPrice = (price) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

const colorMap = {
  قرمز: "#dc2626",
  مشکی: "#171717",
  سفید: "#f5f5f5",
  صورتی: "#f9a8d4",
  آبی: "#60a5fa",
  "آبی روشن": "#93c5fd",
  طوسی: "#9ca3af",
  سرمه‌ای: "#1e3a5f",
  کرم: "#f5deb3",
  قهوه‌ای: "#8b4513",
  زرد: "#facc15",
  سبز: "#4ade80",
  بنفش: "#c084fc",
  نارنجی: "#fb923c",
  شرابی: "#7b1d3e",
  زرشکی: "#9b2c2c",
  یاقوتی: "#7f1d1d",
  نقره‌ای: "#c0c0c0",
  "چند رنگ": "#a78bfa",
  طلایی: "#f59e0b",
  "زرد مایل به سبز": "#a3e635",
};

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((product) => product.slug === slug);
  return <ProductDetails product={product} />;
}
