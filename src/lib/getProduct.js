import { createClient } from "@/lib/supabase/server";

export async function getProductById(id) {
  const supabase = await createClient();

  const { data: product, error: productError } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      original_price,
      is_on_special_list,
      category_id
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (productError) {
    throw productError;
  }

  if (!product) return null;

  const [imagesResult, variantsResult] = await Promise.all([
    supabase
      .from("product_images")
      .select("url, is_thumbnail, id")
      .eq("product_id", product.id)
      .order("is_thumbnail", { ascending: false })
      .order("id", { ascending: true }),

    supabase
      .from("product_variants")
      .select("color, size, stock")
      .eq("product_id", product.id)
      .is("deleted_at", null),
  ]);

  if (imagesResult.error) {
    throw imagesResult.error;
  }

  if (variantsResult.error) {
    throw variantsResult.error;
  }

  const variants = variantsResult.data;

  const images = imagesResult.data.map((row) => row.url);

  const colors = [
    ...new Set(
      variants
        .filter((variant) => variant.color)
        .map((variant) => variant.color),
    ),
  ];

  const sizes = [
    ...new Set(
      variants.filter((variant) => variant.size).map((variant) => variant.size),
    ),
  ];

  const inStock = variants.some((variant) => variant.stock > 0);

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

export async function getProductBySlug(slug) {
  const supabase = await createClient();

  const { data: product, error: productError } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      original_price,
      is_on_special_list,
      category_id
    `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (productError) {
    throw productError;
  }

  if (!product) return null;

  const [imagesResult, variantsResult] = await Promise.all([
    supabase
      .from("product_images")
      .select("url, is_thumbnail, id")
      .eq("product_id", product.id)
      .order("is_thumbnail", { ascending: false })
      .order("id", { ascending: true }),

    supabase
      .from("product_variants")
      .select("color, size, stock")
      .eq("product_id", product.id)
      .is("deleted_at", null),
  ]);

  if (imagesResult.error) {
    throw imagesResult.error;
  }

  if (variantsResult.error) {
    throw variantsResult.error;
  }

  const variants = variantsResult.data;

  const images = imagesResult.data.map((row) => row.url);

  const colors = [
    ...new Set(
      variants
        .filter((variant) => variant.color)
        .map((variant) => variant.color),
    ),
  ];

  const sizes = [
    ...new Set(
      variants.filter((variant) => variant.size).map((variant) => variant.size),
    ),
  ];

  const inStock = variants.some((variant) => variant.stock > 0);

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
