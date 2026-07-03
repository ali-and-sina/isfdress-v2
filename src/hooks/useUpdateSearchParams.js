"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { buildSearchParams } from "@/lib/searchParams";

/**
 * Returns a function you call like: updateSearchParams({ subCategory: "women-skirt" })
 * It merges that into the current URL and navigates — any filter/sort component
 * (buttons, dropdowns, checkboxes) can reuse this instead of managing its own state.
 *
 * By default it also clears the "page" param, since changing a filter should
 * always send you back to page 1. Pass { resetPage: false } to skip that
 * (e.g. the pagination component itself uses resetPage: false).
 */
export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (updates, { resetPage = true } = {}) => {
    const finalUpdates = resetPage ? { ...updates, page: null } : updates;
    const query = buildSearchParams(searchParams, finalUpdates);
    router.push(query ? `${pathname}?${query}` : pathname);
  };
}
