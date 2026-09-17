// navbar.jsx
"use client";

import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
import MobileNav from "./MobileNav";

export default function Navbar({ categories, user }) {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-rose-100 bg-white">
      <DesktopNav
        categories={categories}
        activeMegaMenu={activeMegaMenu}
        setActiveMegaMenu={setActiveMegaMenu}
        user={user}
      />
      <MobileNav openDrawer={() => setMobileMenuOpen(true)} user={user} />
      <MobileDrawer
        categories={categories}
        user={user}
        mobileMenuOpen={mobileMenuOpen}
        closeDrawer={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
