"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { buildSearchParams } from "@/lib/searchParams";

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
