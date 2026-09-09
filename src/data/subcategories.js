// src/data/subcategories.js

export const subCategories = [
  // زنانه (categoryId: 1)
  { id: 1, name: "پیراهن مجلسی", slug: "women-evening-dress", categoryId: 1 },
  { id: 2, name: "پیراهن روزمره", slug: "women-casual-dress", categoryId: 1 },
  { id: 3, name: "دامن", slug: "women-skirt", categoryId: 1 },
  { id: 4, name: "بلوز و تاپ", slug: "women-blouse", categoryId: 1 },
  { id: 5, name: "مانتو", slug: "women-manto", categoryId: 1 },

  // مردانه (categoryId: 2)
  { id: 6, name: "پیراهن مردانه", slug: "men-shirt", categoryId: 2 },
  { id: 7, name: "تیشرت", slug: "men-tshirt", categoryId: 2 },
  { id: 8, name: "شلوار", slug: "men-pants", categoryId: 2 },
  { id: 9, name: "کت و کاپشن", slug: "men-jacket", categoryId: 2 },

  // بچگانه (categoryId: 3)
  { id: 10, name: "نوزاد", slug: "kids-baby", categoryId: 3 },
  { id: 11, name: "دخترانه", slug: "kids-girls", categoryId: 3 },
  { id: 12, name: "پسرانه", slug: "kids-boys", categoryId: 3 },

  // اکسسوری (categoryId: 4)
  { id: 13, name: "کیف", slug: "accessories-bag", categoryId: 4 },
  { id: 14, name: "جواهرات", slug: "accessories-jewelry", categoryId: 4 },
  { id: 15, name: "کفش", slug: "accessories-shoes", categoryId: 4 },
  { id: 16, name: "شال و روسری", slug: "accessories-scarf", categoryId: 4 },
];

// helper: get subcategories that belong to a given category
export const getSubCategoriesByCategoryId = (categoryId) =>
  subCategories.filter((sub) => sub.categoryId === categoryId);
