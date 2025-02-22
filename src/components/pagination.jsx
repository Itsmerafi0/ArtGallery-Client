import React from "react";
import "../styling/pagenation.css"; // Pastikan nama file CSS benar

const Pagination = ({ prevPageUrl, nextPageUrl, fetchData, getPageNumber }) => {
  // Fungsi untuk mengekstrak nomor halaman dari URL
  const extractPageNumber = (url) => {
    if (!url) return null;
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };

  // Handler untuk tombol Previous
  const handlePrevious = () => {
    const pageNumber = extractPageNumber(prevPageUrl);
    if (pageNumber !== null) {
      fetchData(pageNumber);
    }
  };

  // Handler untuk tombol Next
  const handleNext = () => {
    const pageNumber = extractPageNumber(nextPageUrl);
    if (pageNumber !== null) {
      fetchData(pageNumber);
    }
  };

  return (
    <div className="pagination" style={{ marginTop: "20px" }}>
      <button
        onClick={handlePrevious}
        disabled={!prevPageUrl}
        className="pagination-button"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={!nextPageUrl}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
