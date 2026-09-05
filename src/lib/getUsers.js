import { query } from "./db";

export async function getUsers() {
  const sql = `
    SELECT
      id,
      email,
      name,
      avatar_url,
      created_at
    FROM users
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
  `;

  const { rows } = await query(sql);

  return rows;
}
