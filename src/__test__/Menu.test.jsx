import { expect, test, vi, beforeEach, afterEach } from "vitest";
import { getAllArtworks } from "../api/api";

// Mock fetch API sebelum menjalankan setiap test
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            { id: "185779", title: "Train Landscape" },
            { id: "146861", title: "Teardrop I" },
          ],
        }),
    }),
  );
});

// Reset mock setelah setiap test
afterEach(() => {
  vi.restoreAllMocks();
});

// ✅ Test: Memastikan API dipanggil dan mengembalikan id & title
test("Mengambil semua data artwork dengan hanya id dan title", async () => {
  const artworks = await getAllArtworks();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("https://api.artic.edu/api/v1/artworks");

  expect(artworks).toEqual([
    { id: "185779", title: "Train Landscape" },
    { id: "146861", title: "Teardrop I" },
  ]);
});
