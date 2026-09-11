import ProductsClient from "@/components/dashboard/products/ProductsClient";
import { getProducts } from "@/lib/getProducts";

export default async function ProductsPage() {
  const result = await getProducts({
    page: 1,
    sort: "newest",
  });

  return (
    <ProductsClient
      initialProducts={result.products}
      totalItems={result.totalItems}
    />
  );
}
