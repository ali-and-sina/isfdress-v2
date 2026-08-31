import { notFound } from "next/navigation";
import { getCategoryBySlug, getSubCategories } from "@/lib/categories";
import { getProducts } from "@/lib/getProducts";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import Pagination from "@/components/product/Pagination";
import Breadcrumb from "@/components/product/Breadcrumb";
import { getProduct } from "@/lib/getProduct";

export default async function CategoryPage({ params, searchParams }) {
  const { category: categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const subCategories = await getSubCategories(category.id);
  const categoryIds = [category.id, ...subCategories.map((s) => s.id)];

  const { products, currentPage, totalPages } = await getProducts({
    categoryIds,
    sort: resolvedSearchParams.sort,
    page: Number(resolvedSearchParams.page) || 1,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ name: category.name }]} />
      <h1 className="mb-1 mt-3 text-xl font-bold text-gray-900">
        {category.name}
      </h1>
      {category.description && (
        <p className="mb-6 text-sm text-gray-500">{category.description}</p>
      )}
      <div className="mb-6 mt-4">
        <ProductFilters
          categorySlug={category.slug}
          subCategories={subCategories}
        />
      </div>
      <ProductGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
