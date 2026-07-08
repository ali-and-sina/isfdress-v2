// src/lib/products.js

import { products } from "@/data/products";

/**
 * Central place all product queries go through — category page, search,
 * new-arrivals, sale, etc. all just call this with different filters.
 */
export function getProducts({
  categoryId,
  subCategoryId,
  isNew,
  onSale,
  searchQuery,
  sort,
} = {}) {
  let result = [...products];

  if (categoryId) {
    result = result.filter((p) => p.categoryId === Number(categoryId));
  }

  if (subCategoryId) {
    result = result.filter((p) => p.subCategoryId === Number(subCategoryId));
  }

  if (isNew) {
    result = result.filter((p) => p.isNew);
  }

  if (onSale) {
    result = result.filter((p) => p.oldPrice && p.oldPrice > p.price);
  }

  if (searchQuery) {
    const q = searchQuery.trim().toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q));
  }

  return sortProducts(result, sort);
}

function sortProducts(list, sort) {
  switch (sort) {
    case "price-asc":
      return [...list].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...list].sort((a, b) => b.price - a.price);
    case "newest":
      return [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    default:
      return list;
  }
}

/**
 * Slices an already-filtered/sorted list into a page.
 * page comes straight from searchParams, so it's a string — always coerce it.
 */
export function paginateProducts(list, page = 1, perPage = 12) {
  const currentPage = Math.max(1, Number(page) || 1);
  const totalItems = list.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const start = (currentPage - 1) * perPage;

  return {
    items: list.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalItems,
  };
}

export function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export function formatNumber(num) {
  return new Intl.NumberFormat("fa-IR").format(num);
}
