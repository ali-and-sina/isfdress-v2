"use client";

import Link from "next/link";
import { useState } from "react";
import { navbarItems } from "@/data/navbarData";

export default function MobileDrawer({ mobileMenuOpen, closeDrawer }) {
  // null = showing the main category list; otherwise holds the active category item
  const [activeItem, setActiveItem] = useState(null);

  if (!mobileMenuOpen) return null;

  const resetAndClose = () => {
    closeDrawer();
    setActiveItem(null);
  };

  return (
    <>
      <div onClick={resetAndClose} className="fixed inset-0 z-[60] bg-black/30" />

      <aside className="fixed right-0 top-0 z-[70] h-full w-72 overflow-y-auto bg-white shadow-2xl">
        {!activeItem ? (
          <>
            <div className="flex items-center justify-between border-b p-4">
              <span className="font-bold text-rose-800">منو</span>
              <button onClick={resetAndClose}>✕</button>
            </div>

            <div className="space-y-2 p-3">
              {navbarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="flex w-full justify-between rounded-lg px-3 py-2 hover:bg-rose-50"
                >
                  {item.title}
                  <span>‹</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between border-b p-4">
              <button onClick={() => setActiveItem(null)}>برگشت</button>
              <span>{activeItem.title}</span>
              <button onClick={resetAndClose}>✕</button>
            </div>

            <div className="space-y-2 p-3">
              <Link
                href={activeItem.slug}
                onClick={resetAndClose}
                className="block rounded-lg px-3 py-2 font-medium text-rose-700 hover:bg-rose-50"
              >
                مشاهده همه {activeItem.title}
              </Link>

              {activeItem.megaMenuItems?.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/productCategory/${sub.categorySlug}/${sub.slug}`}
                  onClick={resetAndClose}
                  className="block rounded-lg px-3 py-2 hover:bg-rose-50"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
