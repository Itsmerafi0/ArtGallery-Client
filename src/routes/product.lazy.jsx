import { useEffect, useState } from "react";
import { getProduct } from "../api/productApi";
import "../styling/menu.css";
import "../styling/event.css";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import ModalImage from "../components/modal_image";
import Pagination from "../components/pagination";

export const Route = createLazyFileRoute("/product")({
  component: MenuGrid,
});

function MenuGrid() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  async function fetchProductData(page = 1) {
    setLoading(true);
    const data = await getProduct(page);

    if (data) {
      const formattedItems = data.data.map((item) => ({
        id: item.id,
        name: item.title,
        location: item.location,
        category: item.artwork_type_title || "Uncategorized",
        image: item.image_url
          ? item.image_url
          : `https://www.artic.edu/iiif/2/${item.image_id}/full/500,/0/default.jpg`,
        description: item.medium_display || "No description available",
        creator: item.artist_display,
        price: item.min_current_price
          ? `$${item.min_current_price}` // Menampilkan harga dalam format $8
          : "Price not available",
      }));

      setFilteredItems(formattedItems);
      setNextPageUrl(data.pagination?.next_url || null);
      setPrevPageUrl(data.pagination?.prev_url || null);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  function getPageNumber(url) {
    if (!url) return 1;
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return parseInt(urlParams.get("page")) || 1;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading gallery...</p>
      </div>
    ); // Tampilkan animasi loading
  }

  return (
    <div className="event-container">
      <h1 className="event-title">OUR PREMIUM PRODUCTS</h1>
      <p className="event-description">
        We offer high-quality products designed to meet your needs with
        exceptional durability and performance.
      </p>
      <div className="event-content" style={{ marginBottom: "30px" }}>
        <div className="event-image" style={{ marginBottom: "20px" }}>
          <img
            src="https://mms.businesswire.com/media/20201020005281/en/831619/5/DS_Smith_-_Design.jpg"
            alt="Gallery History"
          />
        </div>
        <div className="event-specialty" style={{ padding: "15px" }}>
          <h2>WHY CHOOSE OUR PRODUCTS?</h2>
          <ul>
            <li>
              <strong>High Quality Materials</strong> - We use only the best
              materials to ensure long-lasting durability and reliability.
            </li>
            <li>
              <strong>Innovative Design</strong> - Our products are designed
              with cutting-edge technology to enhance your experience.
            </li>
            <li>
              <strong>Competitive Pricing</strong> - Get the best value for your
              money with our affordable yet premium offerings.
            </li>
            <li>
              <strong>Customer Satisfaction</strong> - We prioritize our
              customers with excellent support and after-sales service.
            </li>
          </ul>
        </div>
      </div>

      <div className="event-content" style={{ marginBottom: "30px" }}>
        <div className="event-benefits" style={{ padding: "15px" }}>
          <h2>WHY BUY FROM US?</h2>
          <ul>
            <li>
              <strong>Trusted by Thousands</strong> - Our customers love our
              products and keep coming back for more.
            </li>
            <li>
              <strong>Fast & Secure Shipping</strong> - We ensure timely
              delivery with safe packaging.
            </li>
            <li>
              <strong>100% Satisfaction Guarantee</strong> - We stand by the
              quality of our products and offer hassle-free returns.
            </li>
            <li>
              <strong>Eco-Friendly Production</strong> - We care for the
              environment and use sustainable materials whenever possible.
            </li>
          </ul>
        </div>
        <div className="event-image" style={{ marginBottom: "20px" }}>
          <img
            src="https://www.unesco.org/sites/default/files/styles/paragraph_medium_desktop/article/2023-07/shutterstock_1575501976_web.jpg?itok=69PcWn0k"
            alt="Gallery History"
          />
        </div>
      </div>

      {loading ? (
        <h3 className="loading-text">Loading...</h3>
      ) : (
        <div>
          <h1 className="menu-title">Product</h1>
          <div className="menu-grid" style={{ gap: "20px" }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="menu-item"
                style={{ padding: "15px", marginBottom: "20px" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-image"
                  onClick={() => setSelectedImage(item.image)}
                />
                <div className="menu-details">
                  <h3>{item.name}</h3>
                  <p>Price : {item.price}</p>
                </div>
                <div className="menu-actions">
                  <Link
                    to="/productDetail"
                    state={{ itemId: item.id }}
                    className="order-button"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            prevPageUrl={prevPageUrl}
            nextPageUrl={nextPageUrl}
            fetchData={fetchProductData}
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
