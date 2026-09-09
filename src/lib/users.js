import { query } from "./db";

export async function getUsers() {
  const { rows } = await query(`
    SELECT
      id,
      google_id,
      email,
      name,
      avatar_url,
      created_at,
      deleted_at
    FROM users
    ORDER BY created_at DESC
  `);

  return rows;
}

export async function getUserById(id) {
  const { rows } = await query(
    `
      SELECT
        id,
        google_id,
        email,
        name,
        avatar_url,
        created_at,
        deleted_at
      FROM users
      WHERE id = $1
    `,
    [id],
  );

  return rows[0] || null;
}

export async function getUserOrders(userId) {
  const { rows } = await query(
    `
      SELECT
        id,
        status,
        total_price,
        created_at,
        updated_at
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
    `,
    [userId],
  );

  return rows;
}

export async function getUserStats(userId) {
  const { rows } = await query(
    `
      SELECT
        COUNT(*)::int AS total_orders,

        COUNT(*) FILTER (
          WHERE status = 'pending'
        )::int AS pending_orders,

        COUNT(*) FILTER (
          WHERE status = 'paid'
        )::int AS paid_orders,

        COUNT(*) FILTER (
          WHERE status = 'shipped'
        )::int AS shipped_orders,

        COUNT(*) FILTER (
          WHERE status = 'delivered'
        )::int AS delivered_orders,

        COUNT(*) FILTER (
          WHERE status = 'cancelled'
        )::int AS cancelled_orders,

        COALESCE(
          SUM(total_price) FILTER (
            WHERE status != 'cancelled'
          ),
          0
        ) AS total_spent

      FROM orders
      WHERE user_id = $1
    `,
    [userId],
  );

  return rows[0];
}
