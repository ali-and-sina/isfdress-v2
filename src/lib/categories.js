import { query } from "./db";
import { unstable_cache } from "next/cache";

export async function getCategoryBySlug(slug) {
  const { rows } = await query(
    `SELECT id, name, slug, description, image_url
     FROM categories
     WHERE slug = $1 AND parent_id IS NULL`,
    [slug]
  );
  return rows[0] || null;
}

export async function getSubCategories(parentId) {
  const { rows } = await query(
    `SELECT id, name, slug, description
     FROM categories
     WHERE parent_id = $1
     ORDER BY id ASC`,
    [parentId]
  );
  return rows;
}

export async function getSubCategoryBySlug(parentId, slug) {
  const { rows } = await query(
    `SELECT id, name, slug, description
     FROM categories
     WHERE parent_id = $1 AND slug = $2`,
    [parentId, slug]
  );
  return rows[0] || null;
}
export async function getNavCategories() {
  const { rows } = await query(`
      SELECT
        c.id,
        c.name,
        c.slug,
        sc.id AS sub_id,
        sc.name AS sub_name,
        sc.slug AS sub_slug
      FROM categories c
      LEFT JOIN categories sc ON sc.parent_id = c.id
      WHERE c.parent_id IS NULL
      ORDER BY c.id, sc.id
    `);

  const map = new Map();

  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        title: row.name,
        slug: `/productCategory/${row.slug}`,
        categorySlug: row.slug,
        megaMenuItems: [],
      });
    }
    if (row.sub_id) {
      map.get(row.id).megaMenuItems.push({
        id: row.sub_id,
        name: row.sub_name,
        slug: row.sub_slug,
        categorySlug: row.slug, // parent's slug, needed for the mega menu link
      });
    }
  }

  return Array.from(map.values());
}
export const getNavCategoriesCached = unstable_cache(
  getNavCategories,
  ["nav-categories"],
  { revalidate: 3600 } // 1 hour; call revalidateTag/revalidatePath from your admin panel when categories change
);
export async function getCategoryPathByLeafId(leafId) {
  const { rows } = await query(
    `SELECT
       leaf.id AS leaf_id, leaf.name AS leaf_name, leaf.slug AS leaf_slug,
       parent.id AS parent_id, parent.name AS parent_name, parent.slug AS parent_slug
     FROM categories leaf
     LEFT JOIN categories parent ON parent.id = leaf.parent_id
     WHERE leaf.id = $1`,
    [leafId]
  );

  const row = rows[0];
  if (!row) return { category: null, subCategory: null };

  // product tagged on a subcategory → parent exists
  if (row.parent_id) {
    return {
      category: {
        id: row.parent_id,
        name: row.parent_name,
        slug: row.parent_slug,
      },
      subCategory: {
        id: row.leaf_id,
        name: row.leaf_name,
        slug: row.leaf_slug,
      },
    };
  }

  // product tagged directly on a top-level category, no subcategory
  return {
    category: { id: row.leaf_id, name: row.leaf_name, slug: row.leaf_slug },
    subCategory: null,
  };
}
