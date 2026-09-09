"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

// categorySlug: e.g. "women"
// subCategories: all subcategories for this category (each has categorySlug + slug)
// activeSubCategorySlug: set when we're already on a /category/subcategory page
export default function ProductFilters({
  categorySlug,
  subCategories,
  activeSubCategorySlug,
  SubcategoryPills = true,
  showIsNewAndOnSale = false,
}) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const activeSort = searchParams.get("sort") || "default";

  // preserve the sort choice when switching subcategory (page reset is fine/expected)
  const sortQuery = searchParams.get("sort");
  const withSort = (path) => (sortQuery ? `${path}?sort=${sortQuery}` : path);

  const isNew = searchParams.get("isNew") === "true";
  const onSale = searchParams.get("onSale") === "true";
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* subcategory pills — real links, not query params */}
      {SubcategoryPills && categorySlug && subCategories && (
        <div className="flex flex-wrap gap-2">
          <Link
            href={withSort(`/productCategory/${categorySlug}`)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !activeSubCategorySlug
                ? "border-rose-600 bg-rose-600 text-white"
                : "border-gray-200 text-gray-600 hover:border-rose-300"
            }`}
          >
            همه
          </Link>

          {subCategories.map((sub) => (
            <Link
              key={sub.id}
              href={withSort(`/productCategory/${categorySlug}/${sub.slug}`)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                activeSubCategorySlug === sub.slug
                  ? "border-rose-600 bg-rose-600 text-white"
                  : "border-gray-200 text-gray-600 hover:border-rose-300"
              }`}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
      {/* on sale and on is new */}
      {showIsNewAndOnSale && (
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) =>
                updateSearchParams({
                  isNew: e.target.checked ? "true" : null,
                })
              }
              className="h-4 w-4"
            />
            محصولات جدید
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) =>
                updateSearchParams({
                  onSale: e.target.checked ? "true" : null,
                })
              }
              className="h-4 w-4"
            />
            محصولات تخفیف‌دار
          </label>
        </div>
      )}
      {/* sort stays a query param — it's not part of the page hierarchy */}
      <select
        value={activeSort}
        onChange={(e) =>
          updateSearchParams({
            sort: e.target.value === "default" ? null : e.target.value,
          })
        }
        className="w-fit rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700"
      >
        <option value="default">مرتب‌سازی</option>
        <option value="newest">جدیدترین</option>
        <option value="price-asc">ارزان‌ترین</option>
        <option value="price-desc">گران‌ترین</option>
      </select>
    </div>
  );
}
