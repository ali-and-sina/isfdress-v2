import { createClient } from "@/lib/supabase/server";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "./supabase/public";

export async function getCategoryBySlug(slug) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, image_url")
    .eq("slug", slug)
    .is("parent_id", null)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getSubCategories(parentId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .eq("parent_id", parentId)
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
}

export async function getCategoryById(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, image_url, parent_id")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getSubCategoryBySlug(parentId, slug) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .eq("parent_id", parentId)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getNavCategories() {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      slug,
      subcategories:categories!parent_id (
        id,
        name,
        slug
      )
    `,
    )
    .is("parent_id", null)
    .order("id", { ascending: true });

  if (error) throw error;

  return data.map((category) => ({
    id: category.id,
    title: category.name,
    slug: `/productCategory/${category.slug}`,
    categorySlug: category.slug,
    megaMenuItems: (category.subcategories || [])
      .sort((a, b) => a.id - b.id)
      .map((sub) => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        categorySlug: category.slug,
      })),
  }));
}

export const getNavCategoriesCached = unstable_cache(
  getNavCategories,
  ["nav-categories"],
  { revalidate: 3600 },
);

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      slug,
      description,
      image_url,
      parent_id
    `,
    )
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
}

export async function getCategoryPathByLeafId(leafId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      slug,
      parent:categories!parent_id (
        id,
        name,
        slug
      )
    `,
    )
    .eq("id", leafId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return {
      category: null,
      subCategory: null,
    };
  }

  if (data.parent) {
    return {
      category: {
        id: data.parent.id,
        name: data.parent.name,
        slug: data.parent.slug,
      },
      subCategory: {
        id: data.id,
        name: data.name,
        slug: data.slug,
      },
    };
  }

  return {
    category: {
      id: data.id,
      name: data.name,
      slug: data.slug,
    },
    subCategory: null,
  };
}
