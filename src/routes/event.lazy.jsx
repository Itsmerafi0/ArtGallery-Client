import { useEffect, useState } from "react";
import { getEvent } from "../api/eventApi";
import "../styling/event.css";
import "..//styling/menu.css";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import ModalImage from "../components/modal_image";
import Pagination from "../components/pagination";

export const Route = createLazyFileRoute("/event")({
  component: MenuGrid,
});

function MenuGrid() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  async function fetchEventData(page = 1) {
    setLoading(true);
    const data = await getEvent(page);

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
      }));

      setFilteredItems(formattedItems);
      setNextPageUrl(data.pagination?.next_url || null);
      setPrevPageUrl(data.pagination?.prev_url || null);
    }

    setLoading(false);
  }
  useEffect(() => {
    fetchEventData();
  }, []);

  function getPageNumber(url) {
    if (!url) return 1;
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return parseInt(urlParams.get("page")) || 1;
  }

  return (
    <div className="event-container">
      <h1 className="event-title">OUR EVENT SERVICES SOLUTIONS</h1>
      <p className="event-description">
        From planning to execution, we craft exceptional corporate events
        tailored to your needs.
      </p>
      <div className="event-content" style={{ marginBottom: "30px" }}>
        <div className="event-image" style={{ marginBottom: "20px" }}>
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2023/11/357657875/BU/ZT/WR/29883999/event-organizers-planning-execution-service.jpg"
            alt="Gallery History"
          />
        </div>
        <div className="event-specialty" style={{ padding: "15px" }}>
          <h2>OUR SPECIALTY</h2>
          <p>
            Our event organizer specializes in client project requests within
            the <b>M.I.C.E.</b> (Meetings, Incentives, Conferences, Exhibitions)
            areas.
          </p>
        </div>
      </div>

      <div className="event-content" style={{ marginBottom: "30px" }}>
        <div className="event-why" style={{ padding: "15px" }}>
          <h2>WHY US?</h2>
          <ul>
            <li>
              <strong>Curated Art Exhibitions</strong> - We showcase stunning
              artwork from emerging and established artists.
            </li>
            <li>
              <strong>Immersive Experiences</strong> - Our events provide a
              unique blend of art, culture, and interaction.
            </li>
            <li>
              <strong>Exclusive Access</strong> - Get VIP access to private
              viewings, artist meet-and-greets, and networking opportunities.
            </li>
          </ul>
        </div>
        <div className="event-image" style={{ marginBottom: "20px" }}>
          <img
            src="https://dimin.com/assets/images/processed/NoCrop_2560x2560/1989-immersive-entertainment.jpg"
            alt="Gallery History"
          />
        </div>
      </div>

      {loading ? (
        <h3 className="loading-text">Loading...</h3>
      ) : (
        <div>
          <h1 className="menu-title">Event Gallery</h1>
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
                  <p>Location : {item.location}</p>
                </div>
                <div className="menu-actions">
                  <Link
                    to="/eventDetail"
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
            fetchData={fetchEventData}
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
