import { useLocation, createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getDetailEvent } from "/src/api/eventApi.js"; // Panggil API
import "/src/styling/detail.css";
import "/src/styling/loadinganimation.css";

export const Route = createLazyFileRoute("/eventDetail")({
  component: EventDetailPage,
});

export function EventDetailPage() {
  const location = useLocation();
  const { itemId } = location.state || {}; // Ambil itemId dari state

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventData() {
      if (!itemId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getDetailEvent(itemId);
        setEvent(data?.data || null);
      } catch (error) {
        console.error("Error fetching event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    fetchEventData();
  }, [itemId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Event...</p>
      </div>
    ); // Tampilkan animasi loading
  }

  return (
    <div className="gallery-container">
      {/* Image Section */}
      <div className="image-section">
        <img
          src={event.image_url}
          alt={event.title}
          className="gallery-image"
        />
      </div>

      {/* Information Section */}
      <div className="info-section">
        <h1 className="gallery-title">{event.title}</h1>
        <p className="gallery-description">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="gallery-description">
          <strong>Date:</strong> {event.date_display}
        </p>
        <p className="gallery-description">
          <strong>Time:</strong> {event.start_time} - {event.end_time}
        </p>
        <p className="gallery-description-">
          <strong>Door Opens:</strong> {event.door_time}
        </p>

        {/* Jika event gratis, tampilkan info */}
        {event.is_free ? (
          <p className="gallery-description">This event is free!</p>
        ) : (
          <p className="gallery-description">
            <strong>Ticket Required:</strong> {event.is_ticketed ? "Yes" : "No"}
          </p>
        )}
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h2>About the Event</h2>
        <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
      </div>
      {/* Back Button */}
      <div className="back-button-container">
        <Link to="/event" className="gallery-button">
          Back to Events
        </Link>
      </div>
    </div>
  );
}
