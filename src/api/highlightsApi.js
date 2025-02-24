import BASE_URL from "./api";

export async function getHotArticles() {
  try {
    const response = await fetch(`${BASE_URL}highlights?limit=5`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetch data:", error);
    return null;
  }
}

export async function getDetailHotArticles(itemId) {
  try {
    const response = await fetch(`${BASE_URL}highlights/${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data : ", error);
    return null;
  }
}
