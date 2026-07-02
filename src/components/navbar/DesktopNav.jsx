"use client";

import Link from "next/link";
import MegaMenu from "./MegaMenu";
import { navbarItems } from "@/data/navbarData";
import Logo from "./Logo";

export default function DesktopNav({ activeMegaMenu, setActiveMegaMenu }) {
  return (
    <div className="hidden md:block">
      {/* top row */}
      <div className="flex h-16 items-center">
        {/* Right section */}
        <div className="flex items-center gap-5">
          <Logo />

          <div className="w-[450px]">
            <input
              type="text"
              placeholder="جستجوی لباس، اکسسوری و ..."
              className="w-full rounded-xl border border-rose-200 bg-white px-4 py-2"
            />
          </div>
        </div>

        {/* Push left section away */}
        <div className="mr-auto flex items-center gap-3">
          <div>🛒</div>

          <button className="rounded-xl bg-rose-600 px-4 py-2 text-white">
            ورود / ثبت نام
          </button>
        </div>
      </div>

      {/* second row */}
      <nav className="flex h-12 items-center gap-6">
        {navbarItems.map((item) => (
          <div
            key={item.id}
            className="relative flex h-full items-center"
            onMouseEnter={() =>
              item.megaMenuItems && setActiveMegaMenu(item.id)
            }
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link href={item.slug}>{item.title}</Link>

            {activeMegaMenu === item.id && item.megaMenuItems && (
              <MegaMenu items={item.megaMenuItems} />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
