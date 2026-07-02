// src/data/navbarData.js

import { categoriesWithSubCategories } from "./categories";

export const navbarItems = [
  {
    id: 1,
    title: "محصولات",
    slug: "/products",
    megaMenuItems: categoriesWithSubCategories, // each category carries its own .subCategories
  },
  {
    id: 2,
    title: "جدیدترین‌ها",
    slug: "/new-arrivals",
  },
  {
    id: 3,
    title: "حراج",
    slug: "/sale",
  },
  {
    id: 4,
    title: "وبلاگ",
    slug: "/blog",
  },
  {
    id: 5,
    title: "درباره ما",
    slug: "/about",
  },
  {
    id: 6,
    title: "تماس با ما",
    slug: "/contact",
  },
];
