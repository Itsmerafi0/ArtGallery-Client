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

export async function getEventOccurrences(page) {
  try {
    const response = await fetch(`${BASE_URL}event-occurrences?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event occurrences:", error);
    return null;
  }
}

export async function getDetailEventOccurrences(itemId) {
  try {
    const response = await fetch(`${BASE_URL}event-occurrences/${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching detail event:", error);
    return null;
  }
}

// Unit Test API
export async function getAllEvent() {
  const response = await fetch(`${BASE_URL}event`);
  const data = await response.json();

  return data.data.map(({ id, title }) => ({ id, title }));
}

export async function getDetailTest() {
  const response = await fetch(`${BASE_URL}event/6087`);
  const { data } = await response.json();
  return {
    id: data.id,
    title: data.title,
  };
}
