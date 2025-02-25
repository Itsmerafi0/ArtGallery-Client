import { useEffect, useState } from "react";
import { getEvent, getEventOccurrences } from "../api/eventApi";
import "../styling/event.css";
import "../styling/menu.css";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import ModalImage from "../components/modal_image";
import Pagination from "../components/pagination";
import "/src/styling/loadinganimation.css";

export const Route = createLazyFileRoute("/event")({
  component: EventPage,
});

function EventPage() {
  return (
    <div>
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
              the <b>M.I.C.E.</b> (Meetings, Incentives, Conferences,
              Exhibitions) areas.
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
        <MenuGrid title="Event Gallery" fetchData={getEvent} />
        <MenuGrid title="Event Occurrences" fetchData={getEventOccurrences} />
      </div>
    </div>
  );
}

function MenuGrid({ title, fetchData }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  async function fetchDataFromApi(page = 1) {
    setLoading(true);
    const data = await fetchData(page);

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

      setItems(formattedItems);
      setNextPageUrl(data.pagination?.next_url || null);
      setPrevPageUrl(data.pagination?.prev_url || null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDataFromApi();
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
        <p>Loading {title}...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="menu-title">{title}</h1>
      <div className="menu-grid" style={{ gap: "20px" }}>
        {items.map((item) => (
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
        fetchData={fetchDataFromApi}
        getPageNumber={getPageNumber}
      />

      <ModalImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}

export default EventPage;
