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
}) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const activeSort = searchParams.get("sort") || "default";

  // preserve the sort choice when switching subcategory (page reset is fine/expected)
  const sortQuery = searchParams.get("sort");
  const withSort = (path) => (sortQuery ? `${path}?sort=${sortQuery}` : path);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* subcategory pills — real links, not query params */}
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
