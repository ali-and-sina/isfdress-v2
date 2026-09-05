import { query } from "./db";

export async function getProducts({
  page = 1,
  sort = "newest",
  onlySpecialProducts = false,
  categoryIds = null,
  onlyOnSale = false,
  searchQuery = null,
} = {}) {
  const conditions = ["p.deleted_at IS NULL"];
  const values = [];

  //  Filters

  if (onlySpecialProducts) {
    conditions.push("p.is_on_special_list IS TRUE");
  }

  if (categoryIds && categoryIds.length > 0) {
    values.push(categoryIds);
    conditions.push(`p.category_id = ANY($${values.length}::int[])`);
  }

  if (onlyOnSale) {
    conditions.push(
      "p.original_price IS NOT NULL AND p.price < p.original_price",
    );
  }

  if (searchQuery) {
    values.push(`%${searchQuery}%`);
    conditions.push(`p.name ILIKE $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  //  Sorting

  let orderBy = "";

  switch (sort) {
    case "price-asc":
      orderBy = "ORDER BY p.price ASC";
      break;

    case "price-desc":
      orderBy = "ORDER BY p.price DESC";
      break;

    case "oldest":
      orderBy = "ORDER BY p.created_at ASC";
      break;

    case "newest":
    default:
      orderBy = "ORDER BY p.created_at DESC";
      break;
  }

  //  Count Query

  const countValues = [...values];

  const countSql = `
    SELECT COUNT(*) AS total
    FROM products p
    ${whereClause}
  `;

  //  Pagination

  const limit = 16;
  const offset = (page - 1) * limit;

  values.push(limit);
  const limitIndex = values.length;

  values.push(offset);
  const offsetIndex = values.length;

  //  Products Query

  const productsSql = `
    SELECT
      p.id,
      p.name,
      p.original_price,
      p.price,
      p.slug,
      p.is_on_special_list,
      pi.url AS thumbnail,
      COALESCE(pv.total_stock, 0) AS stock,
      COALESCE(pv.total_stock, 0) > 0 AS "inStock"

    FROM products p

    LEFT JOIN product_images pi
    ON p.id = pi.product_id
    AND pi.is_thumbnail = TRUE

   LEFT JOIN (
    SELECT
    product_id,
    SUM(stock) AS total_stock
    FROM product_variants
    WHERE deleted_at IS NULL
    GROUP BY product_id)
    pv ON pv.product_id = p.id

    ${whereClause}

    ${orderBy}

    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
  `;

  // ---------------- Execute ----------------

  const [productsResult, countResult] = await Promise.all([
    query(productsSql, values),
    query(countSql, countValues),
  ]);

  const totalItems = Number(countResult.rows[0].total);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return {
    products: productsResult.rows,
    totalItems,
    totalPages,
    currentPage: Number(page),
  };
}
