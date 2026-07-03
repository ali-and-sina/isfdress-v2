// src/data/categories.js

import { getSubCategoriesByCategoryId } from "./subcategories";

export const productCategories = [
  {
    id: 1,
    name: "زنانه",
    slug: "women",
    description: "پوشاک زنانه شامل پیراهن، دامن، مانتو و بیشتر",
    image: "https://i.imgur.com/Wv2KTsf.jpeg",
  },
  {
    id: 2,
    name: "مردانه",
    slug: "men",
    description: "پوشاک مردانه شامل پیراهن، شلوار، کت و بیشتر",
    image: "https://i.imgur.com/76HAxcA.jpeg",
  },
  {
    id: 3,
    name: "بچگانه",
    slug: "kids",
    description: "پوشاک نوزاد، دخترانه و پسرانه",
    image: "https://i.imgur.com/cBuLvBi.jpeg",
  },
  {
    id: 4,
    name: "اکسسوری",
    slug: "accessories",
    description: "کیف، کفش، جواهرات و شال و روسری",
    image: "https://i.imgur.com/N1GkCIR.jpeg",
  },
];

// each category with its subcategories nested in — useful for the mega menu
export const categoriesWithSubCategories = productCategories.map((cat) => ({
  ...cat,
  subCategories: getSubCategoriesByCategoryId(cat.id),
}));
