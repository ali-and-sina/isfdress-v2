import { query } from "./db";

export async function getUserById(id) {
  const sql = `
    SELECT
      id,
      email,
      name,
      avatar_url,
      created_at,
      updated_at
    FROM users
    WHERE id = $1
      AND deleted_at IS NULL
  `;

  const { rows } = await query(sql, [id]);

  return rows[0] || null;
}
