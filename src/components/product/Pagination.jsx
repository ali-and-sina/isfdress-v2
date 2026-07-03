"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { buildSearchParams } from "@/lib/searchParams";

export default function Pagination({ currentPage, totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const hrefForPage = (page) => {
    const query = buildSearchParams(searchParams, {
      page: page === 1 ? null : page,
    });
    return query ? `${pathname}?${query}` : pathname;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      <Link
        href={hrefForPage(Math.max(1, currentPage - 1))}
        className={`rounded-lg border px-3 py-1.5 text-sm ${
          currentPage === 1
            ? "pointer-events-none border-gray-100 text-gray-300"
            : "border-gray-200 text-gray-600 hover:border-rose-300"
        }`}
      >
        قبلی
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={hrefForPage(page)}
          className={`rounded-lg border px-3 py-1.5 text-sm ${
            page === currentPage
              ? "border-rose-600 bg-rose-600 text-white"
              : "border-gray-200 text-gray-600 hover:border-rose-300"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={hrefForPage(Math.min(totalPages, currentPage + 1))}
        className={`rounded-lg border px-3 py-1.5 text-sm ${
          currentPage === totalPages
            ? "pointer-events-none border-gray-100 text-gray-300"
            : "border-gray-200 text-gray-600 hover:border-rose-300"
        }`}
      >
        بعدی
      </Link>
    </div>
  );
}
