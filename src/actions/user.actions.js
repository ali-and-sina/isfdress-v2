"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteUser(id) {
  if (!id) {
    throw new Error("شناسه کاربر الزامی است.");
  }

  const { rows } = await query(
    `
      UPDATE users
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1
        AND deleted_at IS NULL
      RETURNING id
    `,
    [id],
  );

  if (!rows[0]) {
    throw new Error("کاربر پیدا نشد.");
  }

  revalidatePath("/admin/users");

  return rows[0];
}
