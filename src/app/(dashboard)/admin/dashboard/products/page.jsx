import ProductsClient from "@/components/dashboard/products/ProductsClient";
import { getProduct } from "@/lib/getProduct";
import { getProducts } from "@/lib/getProducts";

export default async function ProductsPage() {
  const result = await getProducts({
    page: 1,
    sort: "newest",
  });
  const product = await getProduct(33);
  console.log(product);

  return (
    <ProductsClient
      initialProducts={result.products}
      totalItems={result.totalItems}
    />
  );
}
