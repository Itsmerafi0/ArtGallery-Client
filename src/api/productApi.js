import BASE_URL from "./api";

export async function getProduct(page) {
  try {
    const response = await fetch(`${BASE_URL}products?page=${page}`);
    const data = await response.json();
    return data;
  } catch {
    console.error("Error fetching prdocut:", error);
    return null;
  }
}

export async function getDetailProduct(itemId) {
  try {
    const response = await fetch(`${BASE_URL}products/${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching detail menu:", error);
    return null;
  }
}
