import "/src/styling/about.css";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: AboutUs,
});

function AboutUs() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>About Us</h1>
        <p>
          Where creativity meets inspiration. Experience the world of art like
          never before.
        </p>
      </section>

      {/* Company History */}
      <section className="company-history">
        <div className="content">
          <h2>Our Journey</h2>
          <p>
            Established in 2010, ART Gallery was founded with a vision to create
            a space where art and culture converge. Over the years, we have
            become a leading destination for art lovers, collectors, and
            creatives alike.
          </p>
          <p>
            Our collection features works from both emerging and established
            artists, celebrating diversity and artistic excellence. We believe
            that art is a powerful force that transcends boundaries, inspires
            innovation, and connects communities.
          </p>
        </div>
        <div className="image">
          <img
            src="https://privatebank.barclays.com/content/dam/privatebank-barclays-com/en-gb/private-bank/images/news-and-insights/2019/april/investing-in-art/gallery_3_1.medium.medium_quality.jpg"
            alt="Gallery History"
          />
        </div>
      </section>

      {/* Our Vision & Mission */}
      <section className="mission-vision">
        <div className="box">
          <h3>Our Mission</h3>
          <p>
            To bring art closer to people by curating remarkable pieces that
            inspire, provoke thought, and evoke emotion.
          </p>
        </div>
        <div className="box">
          <h3>Our Vision</h3>
          <p>
            To be a global beacon of artistic innovation, where creativity
            flourishes and culture thrives.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h4>Creativity</h4>
            <p>
              We foster innovation and originality in every artistic expression.
            </p>
          </div>
          <div className="value-item">
            <h4>Community</h4>
            <p>
              We believe in the power of art to connect and inspire people from
              all walks of life.
            </p>
          </div>
          <div className="value-item">
            <h4>Excellence</h4>
            <p>
              We curate only the finest works that embody mastery and vision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
