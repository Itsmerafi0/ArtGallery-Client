import { useLocation, createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getDetailEvent, getDetailEventOccurrences } from "../api/eventApi";
import "../styling/detail.css";
import "../styling/loadinganimation.css";

export const Route = createLazyFileRoute("/eventDetail")({
  component: EventDetailPage,
});

export function EventDetailPage() {
  const location = useLocation();
  const { itemId } = location.state || {}; // Ambil itemId dari state

  const [event, setEvent] = useState(null);
  const [occurrences, setOccurrences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventData() {
      if (!itemId) {
        setLoading(false);
        return;
      }
      try {
        const [eventData, occurrencesData] = await Promise.all([
          getDetailEvent(itemId),
          getDetailEventOccurrences(itemId),
        ]);
        setEvent(eventData?.data || null);
        setOccurrences(occurrencesData?.data || null);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setEvent(null);
        setOccurrences(null);
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
    );
  }

  return (
    <div className="gallery-container">
      {event && (
        <>
          <div className="image-section">
            <img
              src={event.image_url}
              alt={event.title}
              className="gallery-image"
            />
          </div>

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
            <p className="gallery-description">
              <strong>Door Opens:</strong> {event.door_time}
            </p>
            <p className="gallery-description">
              <strong>Ticket Required:</strong>{" "}
              {event.is_free ? "Free Event" : event.is_ticketed ? "Yes" : "No"}
            </p>
          </div>

          <div className="description-section">
            <h2>About the Event</h2>
            <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
          </div>
        </>
      )}

      {occurrences && (
        <>
          <div className="image-section">
            <img
              src={occurrences.image_url}
              alt={occurrences.title}
              className="gallery-image"
            />
          </div>

          <div className="info-section">
            <h1 className="gallery-title">{occurrences.title}</h1>
            <p className="gallery-description">
              <strong>Location:</strong> {occurrences.location}
            </p>
            <p className="gallery-description">
              <strong>Date:</strong>{" "}
              {new Date(occurrences.start_at)
                .toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, " - ")}
            </p>
            <p className="gallery-description">
              <strong>Time:</strong>{" "}
              {new Date(occurrences.start_at).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(occurrences.end_at).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="gallery-description">
              <strong>Ticket Required:</strong>{" "}
              {occurrences.is_free
                ? "Free Event"
                : occurrences.is_ticketed
                  ? "Yes"
                  : "No"}
            </p>
          </div>

          <div className="description-section">
            <h2>About the Event</h2>
            <p
              dangerouslySetInnerHTML={{ __html: occurrences.description }}
            ></p>
          </div>
        </>
      )}

      <div className="back-button-container">
        <Link to="/event" className="gallery-button">
          Back to Events
        </Link>
      </div>
    </div>
  );
}
