import "/src/styling/footer.css"; // Import CSS file
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const PizzaOfTheDay = () => {
  return (
    <div className="pizza-of-the-day-container">
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>
              Welcome to <strong>Art Gallery of the Day</strong>! Explore a
              curated collection of stunning artworks, crafted with creativity,
              passion, and artistic excellence.
            </p>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>
              <FaEnvelope /> Email:{" "}
              <a href="mailto:info@pizzaday.com">info@artgallery.com</a>
            </p>
            <p>
              <FaPhone /> Phone: <a href="tel:+123456789">+123 456 789</a>
            </p>
          </div>

          {/* Social Media Section */}
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <p className="footer-bottom">
          &copy; 2025 ART Gallery. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default PizzaOfTheDay;
