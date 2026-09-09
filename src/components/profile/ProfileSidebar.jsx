"use client";

import { User, ShoppingBag, LogOut } from "lucide-react";
import Image from "next/image";

export default function ProfileSidebar({
  user,
  activeTab,
  onTabChange,
  onLogout,
}) {
  if (!user) return null;
  return (
    <aside className="w-full rounded-2xl border border-neutral-200 bg-white p-5 lg:w-64">
      <div className="mb-6 border-b border-neutral-100 pb-5 ">
        <div className="mb-3 flex h-14 w-14 items-center justify-center text-xl font-semibold relative">
          <Image
            src={user?.image}
            alt={user?.name?.charAt(0)?.toUpperCase()}
            fill
            className="rounded-full"
          />
        </div>
        <h2 className="font-semibold text-neutral-900">{user?.name}</h2>
        <p className="mt-1 break-all text-sm text-neutral-500">{user?.email}</p>
      </div>

      <nav className="space-y-1">
        <button
          type="button"
          onClick={() => onTabChange("profile")}
          className={`flex cursor-pointer w-full items-center gap-3 rounded-xl px-4 py-3 text-sm ${
            activeTab === "profile"
              ? "bg-orange-50 text-orange-600"
              : "text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          <User size={18} />
          اطلاعات حساب
        </button>

        <button
          type="button"
          onClick={() => onTabChange("orders")}
          className={`flex cursor-pointer w-full items-center gap-3 rounded-xl px-4 py-3 text-sm ${
            activeTab === "orders"
              ? "bg-orange-50 text-orange-600"
              : "text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          <ShoppingBag size={18} />
          سفارش‌های من
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
        >
          <LogOut size={18} />
          خروج از حساب
        </button>
      </nav>
    </aside>
  );
}
