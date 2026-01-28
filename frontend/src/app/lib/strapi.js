const STRAPI_URL = "http://localhost:1337";

export async function getRooms() {
  const res = await fetch(
    `${STRAPI_URL}/api/rooms?populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }

  const json = await res.json();

  return json.data.map((item) => {
    const room = item.attributes ?? item;

    return {
      id: item.id,
      slug: room.slug,
      name: room.name,
      category: room.category,
      price: room.price,
      description: room.description,
      previewImage: room.previewImage?.url
        ? `${STRAPI_URL}${room.previewImage.url}`
        : null,
      gallery: Array.isArray(room.gallery)
        ? room.gallery.map((img) => `${STRAPI_URL}${img.url}`)
        : [],
    };
  });
}

export async function getRoomBySlug(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/rooms?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch room");
  }

  const json = await res.json();
  const item = json.data[0];
  if (!item) return null;

  const room = item.attributes ?? item;

  return {
    id: item.id,
    name: room.name,
    category: room.category,
    price: room.price,
    description: room.description,
    gallery: Array.isArray(room.gallery)
      ? room.gallery.map((img) => `${STRAPI_URL}${img.url}`)
      : [],
  };
}
