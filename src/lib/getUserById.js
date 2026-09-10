import { createClient } from "@/lib/supabase/server";

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
