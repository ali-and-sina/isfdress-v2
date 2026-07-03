"use client";

import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
import MobileNav from "./MobileNav";

export default function Navbar() {
  // desktop
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  // mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-rose-100 bg-white ">
      <DesktopNav
        activeMegaMenu={activeMegaMenu}
        setActiveMegaMenu={setActiveMegaMenu}
      />

      <MobileNav openDrawer={() => setMobileMenuOpen(true)} />

      <MobileDrawer
        mobileMenuOpen={mobileMenuOpen}
        closeDrawer={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
