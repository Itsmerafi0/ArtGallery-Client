import BASE_URL from "./api";

export async function getEvent(page) {
  try {
    const response = await fetch(`${BASE_URL}events?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export async function getDetailEvent(itemId) {
  try {
    const response = await fetch(`${BASE_URL}events/${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching detail event:", error);
    return null;
  }
}
