import { createLazyFileRoute, Link } from "@tanstack/react-router";
import "/src/styling/home.css";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1 className="brand-title">ART Gallery</h1>
        <p className="brand-subtitle">
          Discover the beauty of creativity and expression 🎨
        </p>
      </header>

      {/* Menu Navigation */}
      <div className="button-container">
        <Link to="/gallery" className="nav-button explore">
          Gallery Art 🖼️
        </Link>
        <Link to="/event" className="nav-button artists">
          Event 🎭
        </Link>
        <Link to="/product" className="nav-button exhibitions">
          Product 🏛️
        </Link>
      </div>

      {/* Hero Image */}
      <div className="hero-section">
        <img
          src="https://artgallery.yale.edu/sites/default/files/styles/hero_small/public/2023-01/ag-doc-2281-0036-pub.jpg?h=147a4df9&itok=uclO7OrF"
          alt="Art Gallery Yale"
          className="hero-image"
        />
      </div>
    </div>
  );
}

export default Index;
