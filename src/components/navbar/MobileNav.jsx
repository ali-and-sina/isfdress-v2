"use client";

import { ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function MobileNav({ openDrawer,user }) {
  return (
    <div className="md:hidden">
      <div className="flex h-14 items-center justify-between gap-2 bg-rose-50 px-2.5">
        <button
          onClick={openDrawer}
          className="rounded-lg border border-rose-200 bg-white p-2"
        >
          ☰
        </button>

        <Logo />

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <ShoppingCart />
          </Link>

          {!user ? (
            <Link
              href="/login"
              className="rounded-lg bg-rose-600 px-3 py-2 text-xs text-white"
            >
              ورود / ثبت نام
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-rose-600 px-3 py-2 text-xs text-white"
            >
              خروج از حساب کاربری
            </Link>
          )}
        </div>
      </div>

      <div className="pb-3">
        <SearchBar />
      </div>
    </div>
  );
}
