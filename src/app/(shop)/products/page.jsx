import { getProducts as newGetProducts } from "@/lib/getProducts";
import { getPageTitle } from "@/lib/getPageTitle";
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/product/Pagination";
import ProductFilters from "@/components/product/ProductFilters";

export default async function Products({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const title = getPageTitle(resolvedSearchParams);
  const { products, currentPage, totalPages } = await newGetProducts({
    page: Number(resolvedSearchParams.page) || 1,
    onlySpecialProducts: resolvedSearchParams.isNew,
    onlyOnSale: resolvedSearchParams.onSale,
    searchQuery: resolvedSearchParams.q,
    sort: resolvedSearchParams.sort,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-rose-600">
          صفحه اصلی
        </Link>
        <span className="flex items-center gap-1">
          <span className="text-gray-300">/</span>
          <span className="text-gray-800">همه محصولات</span>
        </span>
      </nav>
      <h1 className="mb-1 mt-3 text-xl font-bold text-gray-900">{title}</h1>
      <div className="mb-6 mt-4">
        <ProductFilters
          categorySlug={null}
          subCategories={null}
          showIsNewAndOnSale={true}
        />
      </div>
      <ProductGrid products={products} />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
