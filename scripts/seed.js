import { query } from "../src/lib/db.js";

import categories from "../database/categories.json" with { type: "json" };
import products from "../database/products.json" with { type: "json" };
import images from "../database/product_image.json" with { type: "json" };
import variants from "../database/product_variants.json" with { type: "json" };



async function insertCategories() {
  for (const c of categories) {
    await query(
      `INSERT INTO categories (id, name, slug, description, image_url, parent_id)
       OVERRIDING SYSTEM VALUE
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [c.id, c.name, c.slug, c.description, c.image_url, c.parent_id]
    );
  }
}

async function insertProducts() {
  for (const p of products) {
    await query(
      `INSERT INTO products
        (id, name, slug, description, price, original_price,
         is_published, is_on_special_list, category_id, created_at, deleted_at)
       OVERRIDING SYSTEM VALUE
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       ON CONFLICT (id) DO NOTHING`,
      [
        p.id,
        p.name,
        p.slug,
        p.description,
        p.price,
        p.original_price,
        p.is_published === "t",
        p.is_on_special_list === "t",
        p.category_id,
        p.created_at,
        p.deleted_at,
      ]
    );
  }
}

async function insertImages() {
  for (const img of images) {
    await query(
      `INSERT INTO product_images (id, product_id, url, is_thumbnail, order_index)
       OVERRIDING SYSTEM VALUE
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (id) DO NOTHING`,
      [img.id, img.product_id, img.url, img.is_thumbnail === "t", img.order_index]
    );
  }
}

async function insertVariants() {
  for (const v of variants) {
    await query(
      `INSERT INTO product_variants (id, product_id, color, size, description, stock, created_at, deleted_at)
       OVERRIDING SYSTEM VALUE
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (id) DO NOTHING`,
      [v.id, v.product_id, v.color, v.size, v.description, v.stock, v.created_at, v.deleted_at]
    );
  }
}

async function fixSequence(table) {
  await query(
    `SELECT setval(pg_get_serial_sequence($1, 'id'), COALESCE((SELECT MAX(id) FROM ${table}), 1))`,
    [table]
  );
}

await insertCategories();
await insertProducts();
await insertImages();
await insertVariants();

for (const table of ["categories", "products", "product_images", "product_variants"]) {
  await fixSequence(table);
}

console.log("✅ Seed complete.");
process.exit(0);
