import { createClient } from "@/lib/supabase/server";

export async function getUsers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      email,
      name,
      avatar_url,
      created_at
    `,
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getUserById(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      email,
      name,
      avatar_url,
      created_at,
      updated_at
    `,
    )
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getUserOrders(userId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      total_price,
      created_at,
      updated_at
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getUserStats(userId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("status, total_price")
    .eq("user_id", userId);

  if (error) throw error;

  return {
    total_orders: data.length,
    pending_orders: data.filter((o) => o.status === "pending").length,
    paid_orders: data.filter((o) => o.status === "paid").length,
    shipped_orders: data.filter((o) => o.status === "shipped").length,
    delivered_orders: data.filter((o) => o.status === "delivered").length,
    cancelled_orders: data.filter((o) => o.status === "cancelled").length,
    total_spent: data
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + Number(o.total_price || 0), 0),
  };
}
