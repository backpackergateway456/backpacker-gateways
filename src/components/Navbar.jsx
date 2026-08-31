import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark">H</span>

          <span className="logo-text">
            <strong>HIMALAYAN</strong>
            <small>BACKPACKER HOUSE</small>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Rooms
          </NavLink>

          <NavLink
            to="/experiences"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Experiences
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* DESKTOP ACTION */}
        <div className="nav-actions">
          <Link to="/contact" className="nav-contact">
            Get in touch
          </Link>

          <Link to="/booking" className="nav-book">
            Book Your Stay
            <span>→</span>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`nav-menu-button ${
            menuOpen ? "open" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
        </button>

      </div>

      {/* MOBILE NAVIGATION */}
      <div
        className={`mobile-menu ${
          menuOpen ? "show" : ""
        }`}
      >
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/rooms" onClick={closeMenu}>
          Rooms
        </NavLink>

        <NavLink to="/experiences" onClick={closeMenu}>
          Experiences
        </NavLink>

        <NavLink to="/gallery" onClick={closeMenu}>
          Gallery
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        <Link
          to="/booking"
          className="mobile-book"
          onClick={closeMenu}
        >
          Book Your Stay
          <span>→</span>
        </Link>
      </div>
    </header>
  );
}