import { createFileRoute } from "@tanstack/react-router";
import "/src/styling/contact.css";
import { useState } from "react";
import { sendEmail } from "../utils/emailService";
export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    // Mengambil data dari input form
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      comment: event.target.comment.value,
    };

    try {
      await sendEmail(formData); // Gunakan fungsi sendEmail dari file emailService.js
      setMessage("Formulir berhasil dikirim! Periksa email Anda.");
      event.target.reset();
    } catch (error) {
      setMessage("Terjadi kesalahan saat mengirim formulir.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        {/* Google Maps */}
        <div className="contact-map-container">
          <iframe
            className="contact-map"
            title="Lokasi APL Tower Central Park"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.748536908585!2d106.7893532!3d-6.1761737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7f745db9965%3A0xdd72af6266607f89!2sAPL%20Tower%20Central%20Park!5e0!3m2!1sen!2sid!4v1700000000000"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Formulir Kontak */}
        <div className="contact-form-container">
          <h2>Contact Us</h2>
          {message && <p className="contact-message">{message}</p>}
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              required
            />
            <textarea
              id="comment"
              name="comment"
              placeholder="Write Message Here...."
              rows="4"
              required
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Mengirim..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
