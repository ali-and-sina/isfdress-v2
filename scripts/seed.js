import { query } from "../src/lib/db.js";
import users from "../database/users.json" with { type: "json" };
import categories from "../database/categories.json" with { type: "json" };
import products from "../database/products.json" with { type: "json" };
import images from "../database/product_image.json" with { type: "json" };
import variants from "../database/product_variants.json" with { type: "json" };
import orders from "../database/orders.json" with { type: "json" };
import orderItems from "../database/order_items.json" with { type: "json" };


async function insertUsers() {
  for (const u of users) {
    await query(
      `INSERT INTO users (id, google_id, email, name, avatar_url, created_at, deleted_at)
       OVERRIDING SYSTEM VALUE
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (id) DO NOTHING`,
      [u.id, u.google_id, u.email, u.name, u.avatar_url, u.created_at, u.deleted_at]
    );
  }
}

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

async function insertOrders() {
  for (const o of orders) {
    await query(
      `INSERT INTO orders (id, user_id, status, total_price, created_at)
       OVERRIDING SYSTEM VALUE
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (id) DO NOTHING`,
      [o.id, o.user_id, o.status, o.total_price, o.created_at]
    );
  }
}

async function insertOrderItems() {
  for (const oi of orderItems) {
    await query(
      `INSERT INTO order_items (id, order_id, product_id, variant_id, quantity, unit_price)
       OVERRIDING SYSTEM VALUE
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (id) DO NOTHING`,
      [oi.id, oi.order_id, oi.product_id, oi.variant_id, oi.quantity, oi.unit_price]
    );
  }
}

async function fixSequence(table) {
  await query(
    `SELECT setval(pg_get_serial_sequence($1, 'id'), COALESCE((SELECT MAX(id) FROM ${table}), 1))`,
    [table]
  );
}

await insertUsers();
await insertCategories();
await insertProducts();
await insertImages();
await insertVariants();
await insertOrders();
await insertOrderItems();

for (const table of [ "users",
  "categories",
  "products",
  "product_images",
  "product_variants",
  "orders",
  "order_items",]) {
  await fixSequence(table);
}

console.log("✅ Seed complete.");
process.exit(0);
