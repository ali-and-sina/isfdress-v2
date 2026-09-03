import { query } from "../src/lib/db.js";

// Order matters less here since CASCADE handles dependents,
// but listed in reverse-FK order for clarity.
const dropSql = `
  DROP TABLE IF EXISTS order_items CASCADE;
  DROP TABLE IF EXISTS orders CASCADE;
  DROP TABLE IF EXISTS product_variants CASCADE;
  DROP TABLE IF EXISTS product_images CASCADE;
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS categories CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
`;

await query(dropSql);

console.log("✅ Tables dropped. Run `npm run db:init` to recreate them.");
process.exit(0);
