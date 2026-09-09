// src/data/navbarData.js

import { categoriesWithSubCategories } from "./categories";

// each category IS a nav item — its subcategories become the dropdown
export const navbarItems = categoriesWithSubCategories.map((category) => ({
  id: category.id,
  title: category.name,
  slug: `/productCategory/${category.slug}`,
  megaMenuItems: category.subCategories,
}));
