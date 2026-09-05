"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

export async function updateOrderStatus(id, status) {
  if (!id) {
    throw new Error("شناسه سفارش الزامی است.");
  }

  if (!VALID_STATUSES.includes(status)) {
    throw new Error("وضعیت سفارش نامعتبر است.");
  }

  const { rows } = await query(
    `
      UPDATE orders
      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `,
    [status, id],
  );

  if (!rows[0]) {
    throw new Error("سفارش پیدا نشد.");
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);

  return rows[0];
}
