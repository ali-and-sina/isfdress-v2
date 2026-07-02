// src/data/categories.js

import { getSubCategoriesByCategoryId } from "./subcategories";

export const productCategories = [
  {
    id: 1,
    name: "زنانه",
    slug: "women",
    description: "پوشاک زنانه شامل پیراهن، دامن، مانتو و بیشتر",
  },
  {
    id: 2,
    name: "مردانه",
    slug: "men",
    description: "پوشاک مردانه شامل پیراهن، شلوار، کت و بیشتر",
  },
  {
    id: 3,
    name: "بچگانه",
    slug: "kids",
    description: "پوشاک نوزاد، دخترانه و پسرانه",
  },
  {
    id: 4,
    name: "اکسسوری",
    slug: "accessories",
    description: "کیف، کفش، جواهرات و شال و روسری",
  },
];

// each category with its subcategories nested in — useful for the mega menu
export const categoriesWithSubCategories = productCategories.map((cat) => ({
  ...cat,
  subCategories: getSubCategoriesByCategoryId(cat.id),
}));
