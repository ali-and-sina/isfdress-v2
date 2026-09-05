import { query } from "./db";

export async function getOrderDetails(orderId) {
  const orderSql = `
    SELECT
      o.id,
      o.status,
      o.total_price,
      o.created_at,
      o.updated_at,
      u.id    AS user_id,
      u.name  AS user_name,
      u.email AS user_email
    FROM orders o
    JOIN users u ON u.id = o.user_id
    WHERE o.id = $1
  `;

  const itemsSql = `
    SELECT
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

    WHERE oi.order_id = $1
  `;

  const [orderResult, itemsResult] = await Promise.all([
    query(orderSql, [orderId]),
    query(itemsSql, [orderId]),
  ]);

  const order = orderResult.rows[0];

  if (!order) return null;

  return {
    ...order,
    items: itemsResult.rows,
  };
}
