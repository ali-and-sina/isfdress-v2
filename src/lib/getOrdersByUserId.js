import { createClient } from "@/lib/supabase/server";

export async function getOrdersByUserId(userId) {
  const supabase = await createClient();

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      total_price,
      created_at,
      updated_at
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw ordersError;
  }

  if (orders.length === 0) return [];

  const orderIds = orders.map((order) => order.id);

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select(
      `
      order_id,
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
    `,
    )
    .in("order_id", orderIds);

  if (itemsError) {
    throw itemsError;
  }

  const itemsByOrder = {};

  for (const item of items) {
    if (!itemsByOrder[item.order_id]) {
      itemsByOrder[item.order_id] = [];
    }

    itemsByOrder[item.order_id].push({
      order_id: item.order_id,
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
    });
  }

  return orders.map((order) => ({
    ...order,
    items: itemsByOrder[order.id] || [],
  }));
}
