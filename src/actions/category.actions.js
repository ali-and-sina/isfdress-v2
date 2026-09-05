"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCategory({
  name,
  slug,
  description = null,
  image_url = null,
  parent_id = null,
}) {
  if (!name?.trim()) {
    throw new Error("نام دسته‌بندی الزامی است.");
  }

  if (!slug?.trim()) {
    throw new Error("اسلاگ دسته‌بندی الزامی است.");
  }

  const { rows } = await query(
    `
      INSERT INTO categories (
        name,
        slug,
        description,
        image_url,
        parent_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [name.trim(), slug.trim(), description, image_url, parent_id],
  );

  revalidatePath("/admin/categories");
  revalidatePath("/", "layout");

  return rows[0];
}

export async function updateCategory(
  id,
  { name, slug, description = null, image_url = null, parent_id = null },
) {
  if (!id) {
    throw new Error("شناسه دسته‌بندی الزامی است.");
  }

  if (!name?.trim()) {
    throw new Error("نام دسته‌بندی الزامی است.");
  }

  if (!slug?.trim()) {
    throw new Error("اسلاگ دسته‌بندی الزامی است.");
  }

  const { rows } = await query(
    `
      UPDATE categories
      SET
        name = $1,
        slug = $2,
        description = $3,
        image_url = $4,
        parent_id = $5
      WHERE id = $6
      RETURNING *
    `,
    [name.trim(), slug.trim(), description, image_url, parent_id, id],
  );

  if (!rows[0]) {
    throw new Error("دسته‌بندی پیدا نشد.");
  }

  revalidatePath("/admin/categories");
  revalidatePath("/", "layout");

  return rows[0];
}

export async function deleteCategory(id) {
  if (!id) {
    throw new Error("شناسه دسته‌بندی الزامی است.");
  }

  const { rows: children } = await query(
    `
      SELECT id
      FROM categories
      WHERE parent_id = $1
      LIMIT 1
    `,
    [id],
  );

  if (children.length > 0) {
    throw new Error("این دسته‌بندی دارای زیر‌دسته است و قابل حذف نیست.");
  }

  const { rows: products } = await query(
    `
      SELECT id
      FROM products
      WHERE category_id = $1
        AND deleted_at IS NULL
      LIMIT 1
    `,
    [id],
  );

  if (products.length > 0) {
    throw new Error("این دسته‌بندی دارای محصول است و قابل حذف نیست.");
  }

  const { rows } = await query(
    `
      DELETE FROM categories
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  if (!rows[0]) {
    throw new Error("دسته‌بندی پیدا نشد.");
  }

  revalidatePath("/admin/categories");
  revalidatePath("/", "layout");

  return rows[0];
}
