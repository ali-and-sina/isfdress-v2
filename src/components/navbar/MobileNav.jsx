"use client";

import Logo from "./Logo";

export default function MobileNav({ openDrawer }) {
  return (
    <div className="md:hidden">
      <div className="flex h-14 items-center justify-between gap-2">
        <button
          onClick={openDrawer}
          className="rounded-lg border border-rose-200 bg-white p-2"
        >
          ☰
        </button>

        <Logo />

        <div className="flex items-center gap-2">
          <div>🛒</div>

          <button className="rounded-lg bg-rose-600 px-3 py-2 text-xs text-white">
            ورود / ثبت نام
          </button>
        </div>
      </div>

      <div className="pb-3">
        <input
          type="text"
          placeholder="جستجوی لباس، اکسسوری و ..."
          className="w-full rounded-xl border border-rose-200 bg-white px-4 py-2"
        />
      </div>
    </div>
  );
}
