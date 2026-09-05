import { query } from "./db";

export async function getProduct(slug) {
  const { rows: productRows } = await query(
    `SELECT id, name, slug, description, price, original_price,
     is_on_special_list, category_id
     FROM products
     WHERE slug = $1`,
    [slug],
  );

  const product = productRows[0];
  if (!product) return null;

  const [imagesResult, variantsResult] = await Promise.all([
    query(
      `SELECT url
       FROM product_images
       WHERE product_id = $1
       ORDER BY is_thumbnail DESC, id ASC`,
      [product.id],
    ),
    query(
      `SELECT color, size, stock
      FROM product_variants
      WHERE product_id = $1
      AND deleted_at IS NULL`,
      [product.id],
    ),
  ]);

  const images = imagesResult.rows.map((row) => row.url);

  const colors = [
    ...new Set(variantsResult.rows.filter((v) => v.color).map((v) => v.color)),
  ];
  const sizes = [
    ...new Set(variantsResult.rows.filter((v) => v.size).map((v) => v.size)),
  ];

  const inStock = variantsResult.rows.some((v) => v.stock > 0);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.description,
    price: product.price,
    oldPrice: product.original_price,
    isNew: product.is_on_special_list,
    categoryId: product.category_id,
    images,
    colors,
    sizes,
    inStock,
  };
}
