import { query } from "./db";

export async function getOrders() {
  const sql = `
    SELECT
      o.id,
      o.status,
      o.total_price,
      o.created_at,
      u.name  AS user_name,
      u.email AS user_email
    FROM orders o
    JOIN users u ON u.id = o.user_id
    ORDER BY o.created_at DESC
  `;

  const { rows } = await query(sql);

  return rows;
}
