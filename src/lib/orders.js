import { query } from "./db";

export async function getOrders() {
  const { rows } = await query(
    `
      SELECT
        id,
        user_id,
        status,
        total_price,
        created_at
      FROM orders
      ORDER BY created_at DESC
    `,
  );

  return rows;
}

export async function getOrderById(id) {
  const { rows } = await query(
    `
      SELECT
        o.id,
        o.user_id,
        o.status,
        o.total_price,
        o.created_at,

        oi.id AS item_id,
        oi.quantity,
        oi.unit_price,

        p.id AS product_id,
        p.name AS product_name,
        p.slug AS product_slug,

        v.id AS variant_id,
        v.color AS variant_color,
        v.size AS variant_size,

        pi.url AS product_images

      FROM orders o

      LEFT JOIN order_items oi
        ON oi.order_id = o.id

      LEFT JOIN products p
        ON p.id = oi.product_id

      LEFT JOIN product_variants v
        ON v.id = oi.variant_id

      LEFT JOIN product_images pi
        ON pi.product_id = p.id
        AND pi.is_thumbnail = 't'

      WHERE o.id = $1

      ORDER BY oi.id
    `,
    [id],
  );

  if (rows.length === 0) {
    return null;
  }

  const order = {
    id: rows[0].id,
    user_id: rows[0].user_id,
    status: rows[0].status,
    total_price: rows[0].total_price,
    created_at: rows[0].created_at,
    items: [],
  };

  for (const row of rows) {
    if (row.item_id !== null) {
      order.items.push({
        id: row.item_id,
        quantity: row.quantity,
        unit_price: row.unit_price,

        product: {
          id: row.product_id,
          name: row.product_name,
          slug: row.product_slug,
          image: row.product_images,
        },

        variant: row.variant_id
          ? {
              id: row.variant_id,
              color: row.variant_color,
              size: row.variant_size,
            }
          : null,
      });
    }
  }

  return order;
}
