"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// drop this in place of the plain <input> in both DesktopNav and MobileNav
export default function SearchBar({ className = "" }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser's default full-page form submit
    const trimmed = query.trim();
    if (!trimmed) return; // don't navigate on an empty search
    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجوی لباس، اکسسوری و ..."
        className="w-full rounded-xl border border-rose-200 bg-white px-4 py-2"
      />
    </form>
  );
}
