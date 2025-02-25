import { expect, test, vi, afterEach } from "vitest";
import { getAllGallery, getDetailTest } from "../api/galleryApi";

// Reset mock setelah setiap test
afterEach(() => {
  vi.restoreAllMocks();
});

// ✅ Test: Mengambil semua artworks (id & title)
test("Mengambil semua data artwork dengan hanya id dan title", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [{ id: "14620", title: "Cliff Walk at Pourville" }],
        }),
    }),
  );

  const artworks = await getAllGallery();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("https://api.artic.edu/api/v1/artworks");

  expect(artworks).toEqual([{ id: "14620", title: "Cliff Walk at Pourville" }]);
});

// ✅ Test: Mengambil detail gallery berdasarkan ID
test("Mengambil detail gallery berdasarkan ID", async () => {
  const mockGalleryId = "14620";

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: { id: mockGalleryId, title: "Cliff Walk at Pourville" },
        }),
    }),
  );

  const galleryDetail = await getDetailTest(mockGalleryId);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://api.artic.edu/api/v1/artworks/${mockGalleryId}`,
  );

  expect(galleryDetail).toEqual({
    id: "14620",
    title: "Cliff Walk at Pourville",
  });
});
