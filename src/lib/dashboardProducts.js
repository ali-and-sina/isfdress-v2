import { createClient } from "@/lib/supabase/server";

export async function dashboardProducts({
  page = 1,
  sort = "newest",
  onlySpecialProducts = false,
  categoryIds = null,
  onlyOnSale = false,
  searchQuery = null,
} = {}) {
  const supabase = await createClient();

  const limit = 16;
  const offset = (page - 1) * limit;

  let query = supabase.from("products").select(
    `
        id,
        name,
        original_price,
        price,
        slug,
        is_on_special_list,
        product_images!left (
          url,
          is_thumbnail
        ),
        product_variants!left (
          id,
          color,
          size,
          description,
          stock,
          deleted_at
        )
      `,
    { count: "exact" },
  );

  // Filters
  if (onlySpecialProducts) {
    query = query.eq("is_on_special_list", true);
  }

  if (categoryIds?.length > 0) {
    query = query.in("category_id", categoryIds);
  }

  if (onlyOnSale) {
    query = query
      .not("original_price", "is", null)
      .lt("price", "original_price");
  }

  if (searchQuery) {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  // Sorting
  switch (sort) {
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;

    case "price-desc":
      query = query.order("price", { ascending: false });
      break;

    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;

    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  const products = data.map((product) => ({
    ...product,

    thumbnail:
      product.product_images?.find((image) => image.is_thumbnail)?.url ?? null,

    variants:
      product.product_variants
        ?.filter((variant) => variant.deleted_at === null)
        .map(({ deleted_at, ...variant }) => variant) ?? [],
  }));

  const totalItems = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return {
    products,
    totalItems,
    totalPages,
    currentPage: Number(page),
  };
}
