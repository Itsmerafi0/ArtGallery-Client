import BASE_URL from "./api";

export async function getGallery(page) {
  try {
    const response = await fetch(`${BASE_URL}artworks?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return null;
  }
}

export async function getDetailGallery(itemId) {
  try {
    const response = await fetch(`${BASE_URL}artworks/${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching detail menu:", error);
    return null;
  }
}

export async function getAllGallery() {
  const response = await fetch(`${BASE_URL}gallery`);
  const data = await response.json();

  return data.data.map(({ id, title }) => ({ id, title }));
}
