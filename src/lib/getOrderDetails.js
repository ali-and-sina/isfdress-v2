import { createClient } from "@/lib/supabase/server";

export async function getOrderDetails(orderId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      total_price,
      created_at,
      updated_at,
      user:users (
        id,
        name,
        email
      ),
      order_items (
        id,
        quantity,
        unit_price,
        product:products (
          id,
          name,
          slug,
          price,
          product_images (
            url,
            is_thumbnail
          )
        ),
        variant:product_variants (
          color,
          size
        )
      )
    `,
    )
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    status: data.status,
    total_price: data.total_price,
    created_at: data.created_at,
    updated_at: data.updated_at,

    user_id: data.user?.id ?? null,
    user_name: data.user?.name ?? null,
    user_email: data.user?.email ?? null,

    items: data.order_items.map((item) => ({
      order_item_id: item.id,
      quantity: item.quantity,
      unit_price: item.unit_price,

      product_id: item.product?.id ?? null,
      product_name: item.product?.name ?? null,
      product_slug: item.product?.slug ?? null,
      current_price: item.product?.price ?? null,

      thumbnail:
        item.product?.product_images?.find((image) => image.is_thumbnail)
          ?.url ?? null,

      color: item.variant?.color ?? null,
      size: item.variant?.size ?? null,
    })),
  };
}
