import { useState, useEffect } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import "/src/styling/menu.css";
import "/src/styling/modal.css";
import { getGallery } from "/src/api/galleryApi.js"; // Sesuaikan path
import ModalImage from "../components/modal_image";
import Pagination from "../components/pagination";

export const Route = createLazyFileRoute("/gallery")({
  component: MenuGrid,
});

function MenuGrid() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  async function fetchGalleryData(page = 1) {
    setLoading(true);
    const data = await getGallery(page);

    if (data) {
      const formattedItems = data.data.map((item) => ({
        id: item.id,
        name: item.title,
        category: item.artwork_type_title || "Uncategorized",
        image: item.image_id
          ? `https://www.artic.edu/iiif/2/${item.image_id}/full/500,/0/default.jpg`
          : "https://via.placeholder.com/150",
        description: item.medium_display || "No description available",
        price: "$55.00",
        creator: item.artist_display,
      }));

      setFilteredItems(formattedItems);
      setNextPageUrl(data.pagination?.next_url || null);
      setPrevPageUrl(data.pagination?.prev_url || null);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchGalleryData();
  }, []);

  function getPageNumber(url) {
    if (!url) return 1;
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return parseInt(urlParams.get("page")) || 1;
  }

  return (
    <div className="menu-container">
      <h1 className="menu-title">Art Gallery</h1>

      {loading ? (
        <h3 className="loading-text">Loading...</h3>
      ) : (
        <div>
          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-image"
                  onClick={() => setSelectedImage(item.image)}
                />
                <div className="menu-details">
                  <h3>{item.name}</h3>
                  <p>Artist: {item.creator}</p>
                </div>
                <div className="menu-actions">
                  <Link
                    to="/galleryDetail"
                    state={{ itemId: item.id }}
                    className="order-button"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            prevPageUrl={prevPageUrl}
            nextPageUrl={nextPageUrl}
            fetchData={fetchGalleryData}
            getPageNumber={getPageNumber}
          />
        </div>
      )}
      {/* Modal Image */}
      <ModalImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}

export default MenuGrid;
