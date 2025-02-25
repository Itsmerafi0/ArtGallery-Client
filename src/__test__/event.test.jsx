import { expect, test, vi, afterEach } from "vitest";
import { getAllEvent, getDetailTest } from "../api/eventApi";

// Reset mock setelah setiap test
afterEach(() => {
  vi.restoreAllMocks();
});

// ✅ Test: Mengambil semua event (id & title)
test("Mengambil semua data event dengan hanya id dan title", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              id: "6087",
              title: "Performance: Eternal City—Art and Music in Rome",
            },
          ],
        }),
    }),
  );

  const events = await getAllEvent();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("https://api.artic.edu/api/v1/event");

  expect(events).toEqual([
    {
      id: "6087",
      title: "Performance: Eternal City—Art and Music in Rome",
    },
  ]);
});

// ✅ Test: Mengambil detail event berdasarkan ID
test("Mengambil detail event berdasarkan ID", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: {
            id: "6087",
            title: "Performance: Eternal City—Art and Music in Rome",
          },
        }),
    }),
  );

  const eventDetail = await getDetailTest("6087");

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("https://api.artic.edu/api/v1/event/6087");

  expect(eventDetail).toEqual({
    id: "6087",
    title: "Performance: Eternal City—Art and Music in Rome",
  });
});
