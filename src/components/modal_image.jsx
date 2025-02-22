import React from "react";
import "../styling/modal.css"; // Pastikan styling modal tersedia

const ModalImage = ({ selectedImage, setSelectedImage }) => {
  if (!selectedImage) return null; // Jangan tampilkan modal jika tidak ada gambar

  return (
    <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={selectedImage} alt="Selected" />
        <button className="close-button" onClick={() => setSelectedImage(null)}>
          ×
        </button>
      </div>
    </div>
  );
};

export default ModalImage;
