import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getSubCategories,
  getSubCategoryBySlug,
} from "@/lib/categories";
import { getProducts } from "@/lib/getProducts";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import Pagination from "@/components/product/Pagination";
import Breadcrumb from "@/components/product/Breadcrumb";

export default async function SubCategoryPage({ params, searchParams }) {
  const { category: categorySlug, subcategory: subCategorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const subCategory = await getSubCategoryBySlug(category.id, subCategorySlug);
  if (!subCategory) notFound();

  const allSubCategories = await getSubCategories(category.id);

  const { products, currentPage, totalPages } = await getProducts({
    categoryIds: [subCategory.id],
    sort: resolvedSearchParams.sort,
    page: Number(resolvedSearchParams.page) || 1,
  });

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
      <ProductGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
