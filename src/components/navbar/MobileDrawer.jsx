"use client";

import Link from "next/link";
import { useState } from "react";
import { navbarItems } from "@/data/navbarData";

export default function MobileDrawer({ mobileMenuOpen, closeDrawer }) {
  // view.level: "main" | "categories" | "sub"
  const [view, setView] = useState({ level: "main" });

  if (!mobileMenuOpen) return null;

  const resetAndClose = () => {
    closeDrawer();
    setView({ level: "main" });
  };

  return (
    <>
      <div onClick={resetAndClose} className="fixed inset-0 z-[60] bg-black/30" />

      <aside className="fixed right-0 top-0 z-[70] h-full w-72 overflow-y-auto bg-white shadow-2xl">
        {/* MAIN: محصولات / جدیدترین‌ها / حراج / وبلاگ ... */}
        {view.level === "main" && (
          <>
            <div className="flex items-center justify-between border-b p-4">
              <span className="font-bold text-rose-800">منو</span>
              <button onClick={resetAndClose}>✕</button>
            </div>

            <div className="space-y-2 p-3">
              {navbarItems.map((item) => {
                if (item.megaMenuItems) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setView({ level: "categories", topItem: item })}
                      className="flex w-full justify-between rounded-lg px-3 py-2 hover:bg-rose-50"
                    >
                      {item.title}
                      <span>‹</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.slug}
                    onClick={resetAndClose}
                    className="block rounded-lg px-3 py-2 hover:bg-rose-50"
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* LEVEL 2: زنانه / مردانه / بچگانه / اکسسوری */}
        {view.level === "categories" && (
          <>
            <div className="flex items-center justify-between border-b p-4">
              <button onClick={() => setView({ level: "main" })}>برگشت</button>
              <span>{view.topItem.title}</span>
              <button onClick={resetAndClose}>✕</button>
            </div>

            <div className="space-y-2 p-3">
              <Link
                href={view.topItem.slug}
                onClick={resetAndClose}
                className="block rounded-lg px-3 py-2 font-medium text-rose-700 hover:bg-rose-50"
              >
                مشاهده همه محصولات
              </Link>

              {view.topItem.megaMenuItems.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setView({ level: "sub", category, topItem: view.topItem })
                  }
                  className="flex w-full justify-between rounded-lg px-3 py-2 hover:bg-rose-50"
                >
                  {category.name}
                  <span>‹</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* LEVEL 3: پیراهن مجلسی / دامن / بلوز ... (subcategories of a category) */}
        {view.level === "sub" && (
          <>
            <div className="flex items-center justify-between border-b p-4">
              <button
                onClick={() =>
                  setView({ level: "categories", topItem: view.topItem })
                }
              >
                برگشت
              </button>
              <span>{view.category.name}</span>
              <button onClick={resetAndClose}>✕</button>
            </div>

            <div className="space-y-2 p-3">
              <Link
                href={`/productCategory/${view.category.slug}`}
                onClick={resetAndClose}
                className="block rounded-lg px-3 py-2 font-medium text-rose-700 hover:bg-rose-50"
              >
                مشاهده همه {view.category.name}
              </Link>

              {view.category.subCategories?.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/productCategory/${sub.slug}`}
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
