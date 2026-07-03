import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-gray-500">
        محصولی یافت نشد
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
