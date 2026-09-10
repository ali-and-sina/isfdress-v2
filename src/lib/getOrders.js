import { createClient } from "@/lib/supabase/server";

export async function getOrders() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      total_price,
      created_at,
      user:users (
        name,
        email
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((order) => ({
    id: order.id,
    status: order.status,
    total_price: order.total_price,
    created_at: order.created_at,
    user_name: order.user?.name ?? null,
    user_email: order.user?.email ?? null,
  }));
}
