import { supabase } from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("price", { ascending: true });

  if (error) {
    console.error("Supabase getRooms error:", error);
    return [];
  }

  return data;
}

export async function getRoomBySlug(slug) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Supabase getRoomBySlug error:", error);
    return null;
  }

  return data;
}
