"use client";

import Link from "next/link";
import MegaMenu from "./MegaMenu";
import { navbarItems } from "@/data/navbarData";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function DesktopNav({ activeMegaMenu, setActiveMegaMenu }) {
  return (
    <div className="hidden md:block">
      {/* top row */}
      <div className="flex h-16 items-center bg-rose-50 px-2.5">
        {/* Right section */}
        <div className="flex items-center gap-5">
          <Logo />

          <div className="w-[450px]">
            <SearchBar />
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
      <nav className="flex h-12  items-center justify-around divide-x divide-gray-200 px-12 ">
        {navbarItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex h-full items-center px-8 cursor-pointer"
            onMouseEnter={() =>
              item.megaMenuItems && setActiveMegaMenu(item.id)
            }
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link
              href={item.slug}
              className="px-4 relative py-2 text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-rose-600 after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-0 after:bg-rose-500 after:transition-all after:duration-300 group-hover:after:w-full"
            >
              {item.title}
            </Link>

            {activeMegaMenu === item.id && item.megaMenuItems && (
              <MegaMenu items={item.megaMenuItems} />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
