import { notFound } from "next/navigation";
import { productCategories } from "@/data/categories";
import { getSubCategoriesByCategoryId } from "@/data/subcategories";
import { getProducts, paginateProducts } from "@/lib/products";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import Pagination from "@/components/product/Pagination";
import Breadcrumb from "@/components/product/Breadcrumb";

export default async function CategoryPage({ params, searchParams }) {
  const { category: categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const category = productCategories.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const subCategories = getSubCategoriesByCategoryId(category.id);

  const filteredProducts = getProducts({
    categoryId: category.id,
    sort: resolvedSearchParams.sort,
  });

  const { items, currentPage, totalPages } = paginateProducts(
    filteredProducts,
    resolvedSearchParams.page,
    12
  );

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

      <ProductGrid products={items} />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
