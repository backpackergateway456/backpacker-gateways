import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">H</span>
            <span>
              <strong>Himalayan</strong>
              <small>Backpacker House</small>
            </span>
          </Link>

          <p>
            A comfortable base for backpackers, trekkers and travellers
            exploring the Himalayas.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <Link to="/rooms">Rooms</Link>
          <Link to="/experiences">Experiences</Link>
          <Link to="/gallery">Gallery</Link>
        </div>

        <div>
          <h3>Information</h3>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/booking">Booking</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Kathmandu, Nepal</p>
          <p>hello@himalayanbackpackerhouse.com</p>
          <p>+977 9800000000</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} Himalayan Backpacker House. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}