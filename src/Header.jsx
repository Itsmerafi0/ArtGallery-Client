import { FaMapMarkerAlt, FaClock, FaTicketAlt } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import "/src/styling/header.css"; // Tambahkan file CSS

export default function Header() {
  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-left">
          <span className="top-item">
            <FaTicketAlt />
            Admission is always free
          </span>
          <span className="top-item">
            <FaClock />
            Open today: 10:00 to 17:00
          </span>
          <span className="top-item">
            <FaMapMarkerAlt />
            Directions
          </span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        {/* Logo sebagai tombol */}
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <span className="logo-bold">International</span>{" "}
            <span className="logo-light">Gallery of Art</span>
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="nav-menu">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/event">Event</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/product">Product</Link>
          <Link to="/articles">Article</Link>
        </ul>
      </nav>
    </header>
  );
}
