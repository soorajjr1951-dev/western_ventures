// src/app/lib/rooms.js
import { supabase } from "./supabaseClient";

// PUBLIC — rooms list
export async function getRooms() {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("price", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// PUBLIC — room detail
export async function getRoomBySlug(slug) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return {
    ...data,
    gallery: data.gallery ?? [],
  };
}

// ADMIN — create room
export async function createRoom(room) {
  const { error } = await supabase.from("rooms").insert(room);
  if (error) throw error;
}

// ADMIN — update room
export async function updateRoom(id, room) {
  const { error } = await supabase
    .from("rooms")
    .update(room)
    .eq("id", id);
  if (error) throw error;
}

// ADMIN — delete room
export async function deleteRoom(id) {
  const { error } = await supabase
    .from("rooms")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
