import { useLocation, createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getDetailGallery } from "/src/api/galleryApi.js"; // API to fetch data
import "/src/styling/detail.css";

export const Route = createLazyFileRoute("/galleryDetail")({
  component: galleryDetail,
});

export function galleryDetail() {
  const location = useLocation();
  const { itemId } = location.state || {}; // Retrieve itemId from state

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleryData() {
      if (!itemId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getDetailGallery(itemId);
        setArtwork(data?.data || null);
      } catch (error) {
        console.error("Error fetching artwork:", error);
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryData();
  }, [itemId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Gallery...</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {/* Image Section */}
      <div className="image-section">
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          alt={artwork.title}
          className="gallery-image"
        />
      </div>

      {/* Information Section */}
      <div className="info-section">
        <h1 className="gallery-title">{artwork.title}</h1>
        <p className="gallery-category">
          <strong>Artist:</strong> {artwork.artist_display}
        </p>
        <p className="gallery-description">
          <strong>Creation Date:</strong> {artwork.date_display}
        </p>
        <p className="gallery-description">
          <strong>Medium:</strong> {artwork.medium_display}
        </p>
        <p className="gallery-description">
          <strong>Dimensions:</strong> {artwork.dimensions}
        </p>
        <p className="gallery-description">
          <strong>Collection Location:</strong>{" "}
          {artwork.place_of_origin || "Unknown"}
        </p>
        <p className="gallery-description">
          <strong>Credit:</strong> {artwork.credit_line}
        </p>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h2>Artwork Description</h2>
        <p
          dangerouslySetInnerHTML={{
            __html:
              artwork.description || "No description available for this event.",
          }}
        ></p>
      </div>

      {/* Back Button */}
      <div className="back-button-container">
        <Link to="/gallery" className="gallery-button">
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}
