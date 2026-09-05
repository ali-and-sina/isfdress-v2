"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProduct({
  name,
  slug,
  description = null,
  price,
  original_price = null,
  is_published = false,
  is_on_special_list = false,
  category_id,
}) {
  if (!name?.trim()) {
    throw new Error("نام محصول الزامی است.");
  }

  if (!slug?.trim()) {
    throw new Error("اسلاگ محصول الزامی است.");
  }

  if (price === undefined || price === null || Number(price) < 0) {
    throw new Error("قیمت محصول نامعتبر است.");
  }

  if (!category_id) {
    throw new Error("دسته‌بندی محصول الزامی است.");
  }

  const { rows } = await query(
    `
      INSERT INTO products (
        name,
        slug,
        description,
        price,
        original_price,
        is_published,
        is_on_special_list,
        category_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
    [
      name.trim(),
      slug.trim(),
      description,
      Number(price),
      original_price === null ? null : Number(original_price),
      Boolean(is_published),
      Boolean(is_on_special_list),
      Number(category_id),
    ],
  );

  revalidatePath("/admin/products");

  return rows[0];
}

export async function updateProduct(
  id,
  {
    name,
    slug,
    description = null,
    price,
    original_price = null,
    is_published = false,
    is_on_special_list = false,
    category_id,
  },
) {
  if (!id) {
    throw new Error("شناسه محصول الزامی است.");
  }

  if (!name?.trim()) {
    throw new Error("نام محصول الزامی است.");
  }

  if (!slug?.trim()) {
    throw new Error("اسلاگ محصول الزامی است.");
  }

  if (price === undefined || price === null || Number(price) < 0) {
    throw new Error("قیمت محصول نامعتبر است.");
  }

  if (!category_id) {
    throw new Error("دسته‌بندی محصول الزامی است.");
  }

  const { rows } = await query(
    `
      UPDATE products
      SET
        name = $1,
        slug = $2,
        description = $3,
        price = $4,
        original_price = $5,
        is_published = $6,
        is_on_special_list = $7,
        category_id = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
        AND deleted_at IS NULL
      RETURNING *
    `,
    [
      name.trim(),
      slug.trim(),
      description,
      Number(price),
      original_price === null ? null : Number(original_price),
      Boolean(is_published),
      Boolean(is_on_special_list),
      Number(category_id),
      id,
    ],
  );

  if (!rows[0]) {
    throw new Error("محصول پیدا نشد.");
  }

  revalidatePath("/admin/products");
  revalidatePath(`/product/${rows[0].slug}`);

  return rows[0];
}

export async function deleteProduct(id) {
  if (!id) {
    throw new Error("شناسه محصول الزامی است.");
  }

  const { rows } = await query(
    `
      UPDATE products
      SET
        deleted_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
        AND deleted_at IS NULL
      RETURNING id, slug
    `,
    [id],
  );

  if (!rows[0]) {
    throw new Error("محصول پیدا نشد.");
  }

  revalidatePath("/admin/products");
  revalidatePath(`/product/${rows[0].slug}`);

  return rows[0];
}

export async function createProductVariant(
  productId,
  { color = null, size = null, description = null, stock = 0 },
) {
  if (!productId) {
    throw new Error("شناسه محصول الزامی است.");
  }

  if (Number(stock) < 0) {
    throw new Error("موجودی نمی‌تواند منفی باشد.");
  }

  const { rows } = await query(
    `
      INSERT INTO product_variants (
        product_id,
        color,
        size,
        description,
        stock
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [productId, color, size, description, Number(stock)],
  );

  revalidatePath("/admin/products");

  return rows[0];
}

export async function updateProductVariant(
  id,
  { color = null, size = null, description = null, stock = 0 },
) {
  if (!id) {
    throw new Error("شناسه واریانت الزامی است.");
  }

  if (Number(stock) < 0) {
    throw new Error("موجودی نمی‌تواند منفی باشد.");
  }

  const { rows } = await query(
    `
      UPDATE product_variants
      SET
        color = $1,
        size = $2,
        description = $3,
        stock = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
        AND deleted_at IS NULL
      RETURNING *
    `,
    [color, size, description, Number(stock), id],
  );

  if (!rows[0]) {
    throw new Error("واریانت پیدا نشد.");
  }

  revalidatePath("/admin/products");

  return rows[0];
}

export async function deleteProductVariant(id) {
  if (!id) {
    throw new Error("شناسه واریانت الزامی است.");
  }

  const { rows } = await query(
    `
      UPDATE product_variants
      SET deleted_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
        AND deleted_at IS NULL
      RETURNING *
    `,
    [id],
  );

  if (!rows[0]) {
    throw new Error("واریانت پیدا نشد.");
  }

  revalidatePath("/admin/products");

  return rows[0];
}

export async function addProductImage(
  productId,
  { url, is_thumbnail = false, order_index = 1 },
) {
  if (!productId) {
    throw new Error("شناسه محصول الزامی است.");
  }

  if (!url?.trim()) {
    throw new Error("آدرس تصویر الزامی است.");
  }

  const { rows } = await query(
    `
      INSERT INTO product_images (
        product_id,
        url,
        is_thumbnail,
        order_index
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [productId, url.trim(), Boolean(is_thumbnail), Number(order_index)],
  );

  revalidatePath("/admin/products");

  return rows[0];
}

export async function deleteProductImage(id) {
  if (!id) {
    throw new Error("شناسه تصویر الزامی است.");
  }

  const { rows } = await query(
    `
      DELETE FROM product_images
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  if (!rows[0]) {
    throw new Error("تصویر پیدا نشد.");
  }

  revalidatePath("/admin/products");

  return rows[0];
}
