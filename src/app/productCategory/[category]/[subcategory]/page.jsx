import { notFound } from "next/navigation";
import { productCategories } from "@/data/categories";
import {
  subCategories,
  getSubCategoriesByCategoryId,
} from "@/data/subcategories";
import { getProducts, paginateProducts } from "@/lib/products";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import Pagination from "@/components/product/Pagination";
import Breadcrumb from "@/components/product/Breadcrumb";

export default async function SubCategoryPage({ params, searchParams }) {
  const { category: categorySlug, subcategory: subCategorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const category = productCategories.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const subCategory = subCategories.find(
    (s) => s.slug === subCategorySlug && s.categoryId === category.id
  );
  if (!subCategory) notFound();

  const allSubCategories = getSubCategoriesByCategoryId(category.id);

  const filteredProducts = getProducts({
    categoryId: category.id,
    subCategoryId: subCategory.id,
    sort: resolvedSearchParams.sort,
  });

  const { items, currentPage, totalPages } = paginateProducts(
    filteredProducts,
    resolvedSearchParams.page,
    12
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb
        items={[
          { name: category.name, href: `/productCategory/${category.slug}` },
          { name: subCategory.name },
        ]}
      />

      <h1 className="mb-6 mt-3 text-xl font-bold text-gray-900">
        {subCategory.name}
      </h1>

      <div className="mb-6">
        <ProductFilters
          categorySlug={category.slug}
          subCategories={allSubCategories}
          activeSubCategorySlug={subCategory.slug}
        />
      </div>

      <ProductGrid products={items} />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
