import BASE_URL from "./api";

export async function getArticles(page) {
  try {
    const response = await fetch(`${BASE_URL}articles?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetch data:", error);
    return null;
  }
}
