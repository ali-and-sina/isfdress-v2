import { query } from "./db";

export async function getOrdersByUserId(userId) {
  const ordersSql = `
    SELECT
      id,
      status,
      total_price,
      created_at,
      updated_at
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const { rows: orders } = await query(ordersSql, [userId]);

  if (orders.length === 0) return [];

  const orderIds = orders.map((o) => o.id);

  const itemsSql = `
    SELECT
      oi.order_id,
      oi.id AS order_item_id,
      oi.quantity,
      oi.unit_price,

      p.id    AS product_id,
      p.name  AS product_name,
      p.slug  AS product_slug,
      p.price AS current_price,

      pi.url AS thumbnail,

      pv.color,
      pv.size

    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    LEFT JOIN product_variants pv ON pv.id = oi.variant_id
    LEFT JOIN product_images pi
      ON pi.product_id = p.id
      AND pi.is_thumbnail = TRUE

    WHERE oi.order_id = ANY($1::int[])
  `;

  const { rows: items } = await query(itemsSql, [orderIds]);

  const itemsByOrder = {};
  for (const item of items) {
    if (!itemsByOrder[item.order_id]) itemsByOrder[item.order_id] = [];
    itemsByOrder[item.order_id].push(item);
  }

  return orders.map((order) => ({
    ...order,
    items: itemsByOrder[order.id] || [],
  }));
}
