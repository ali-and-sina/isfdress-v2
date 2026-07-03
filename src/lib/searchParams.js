// src/lib/searchParams.js

/**
 * Merges `updates` into the current search params.
 * Pass null/undefined/"" as a value to REMOVE that key (e.g. clearing a filter).
 * Returns a query string (no leading "?").
 */
export function buildSearchParams(currentParams, updates) {
  const params = new URLSearchParams(currentParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });

  return params.toString();
}
