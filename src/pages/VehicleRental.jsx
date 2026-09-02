import { useState } from "react";
import { Link } from "react-router-dom";
import "./VehicleRental.css";

const vehicles = [
  {
    id: 1,
    name: "Premium Tourist Car",
    type: "PRIVATE CAR",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
    seats: "4 Seats",
    service: "Private Driver",
    airport: "$40",
    fullDay: "$130",
    duration: "Up to 200 km / 10 hours",
    description:
      "Comfortable private car for airport transfers, Kathmandu sightseeing and private journeys.",
    popular: false,
  },
  {
    id: 2,
    name: "Tourist 4WD Jeep",
    type: "4X4 JEEP",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    seats: "6–7 Seats",
    service: "Private Driver",
    airport: "$50",
    fullDay: "$160",
    duration: "Up to 200 km / 10 hours",
    description:
      "Reliable four-wheel-drive vehicle for mountain roads, adventure routes and long-distance travel.",
    popular: true,
  },
  {
    id: 3,
    name: "Toyota Innova Crysta",
    type: "PREMIUM MPV",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    seats: "6–7 Seats",
    service: "Private Driver",
    airport: "$60",
    fullDay: "$100",
    duration: "Comfortable full-day service",
    description:
      "Spacious and premium transport for families, sightseeing and comfortable private tours.",
    popular: false,
  },
  {
    id: 4,
    name: "Toyota Hiace",
    type: "TOURIST VAN",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    seats: "12–14 Seats",
    service: "Professional Driver",
    airport: "$100",
    fullDay: "$60",
    duration: "Comfortable group service",
    description:
      "A spacious tourist van ideal for families, friends and group journeys across Nepal.",
    popular: false,
  },
  {
    id: 5,
    name: "Mahindra Scorpio",
    type: "SUV / 4X4",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    seats: "6–7 Seats",
    service: "Private Driver",
    airport: "$100",
    fullDay: "$100",
    duration: "Private full-day service",
    description:
      "Reliable and comfortable SUV for mountain destinations and adventurous road trips.",
    popular: false,
  },
  {
    id: 6,
    name: "Luxury Tourist Bus",
    type: "GROUP COACH",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    seats: "25–35 Seats",
    service: "Professional Driver",
    airport: "$80",
    fullDay: "$120",
    duration: "Private group transportation",
    description:
      "Comfortable tourist coach for groups, corporate tours, pilgrimages and large families.",
    popular: false,
  },
];

export default function VehicleRental() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [seatFilter, setSeatFilter] = useState("");

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      vehicleType === "" || vehicle.type === vehicleType;

    const matchesSeats =
      seatFilter === "" || vehicle.seats === seatFilter;

    return matchesSearch && matchesType && matchesSeats;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setVehicleType("");
    setSeatFilter("");
  };

  return (
    <main className="vehicle-page">

      {/* ================= VEHICLE COLLECTION ================= */}

      <section
        className="vehicle-list-section"
        id="vehicles"
      >
        <div className="vehicle-container">

          {/* HEADING */}

          <div className="vehicle-section-heading">

            <div>
              <span className="vehicle-section-label">
                TOURIST VEHICLE RENTAL
              </span>

              <h1>
                Find your perfect ride
              </h1>
            </div>

            <div className="fleet-info">
              <span>
                Safe, comfortable and reliable travel across Nepal.
              </span>

              <strong>
                6 Vehicle Options
              </strong>
            </div>

          </div>


          {/* ================= SEARCH ================= */}

          <div className="vehicle-search-section">

            <div className="vehicle-search-header">
              <div>
                <span className="vehicle-section-label">
                  FIND YOUR VEHICLE
                </span>

                <h2>
                  Search your journey
                </h2>
              </div>

              <button
                className="clear-filter-btn"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>


            <div className="vehicle-search-grid">

              {/* SEARCH NAME */}

              <div className="vehicle-search-field">
                <label>
                  Search Vehicle
                </label>

                <input
                  type="text"
                  placeholder="Toyota, Jeep, Car..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>


              {/* VEHICLE TYPE */}

              <div className="vehicle-search-field">
                <label>
                  Vehicle Type
                </label>

                <select
                  value={vehicleType}
                  onChange={(e) =>
                    setVehicleType(e.target.value)
                  }
                >
                  <option value="">
                    All Vehicle Types
                  </option>

                  <option value="PRIVATE CAR">
                    Private Car
                  </option>

                  <option value="4X4 JEEP">
                    4x4 Jeep
                  </option>

                  <option value="PREMIUM MPV">
                    Premium MPV
                  </option>

                  <option value="TOURIST VAN">
                    Tourist Van
                  </option>

                  <option value="SUV / 4X4">
                    SUV / 4x4
                  </option>

                  <option value="GROUP COACH">
                    Group Coach
                  </option>
                </select>
              </div>


              {/* SEATS */}

              <div className="vehicle-search-field">
                <label>
                  Passengers
                </label>

                <select
                  value={seatFilter}
                  onChange={(e) =>
                    setSeatFilter(e.target.value)
                  }
                >
                  <option value="">
                    Any Group Size
                  </option>

                  <option value="4 Seats">
                    1–4 People
                  </option>

                  <option value="6–7 Seats">
                    5–7 People
                  </option>

                  <option value="12–14 Seats">
                    8–14 People
                  </option>

                  <option value="25–35 Seats">
                    Large Group
                  </option>
                </select>
              </div>


              {/* SEARCH BUTTON */}

              <div className="vehicle-search-action">

                <button
                  className="vehicle-primary-btn"
                  onClick={() =>
                    document
                      .getElementById("vehicle-results")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Search Vehicles
                  <span>→</span>
                </button>

              </div>

            </div>

          </div>


          {/* RESULT INFO */}

          <div
            className="vehicle-results-info"
            id="vehicle-results"
          >
            <span>
              Showing{" "}
              <strong>
                {filteredVehicles.length}
              </strong>{" "}
              vehicle
              {filteredVehicles.length !== 1
                ? "s"
                : ""}
            </span>
          </div>


          {/* ================= VEHICLE GRID ================= */}

          {filteredVehicles.length > 0 ? (

            <div className="vehicle-grid">

              {filteredVehicles.map((vehicle) => (

                <article
                  className="vehicle-card"
                  key={vehicle.id}
                >

                  {/* IMAGE */}

                  <div className="vehicle-image-wrap">

                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      loading="lazy"
                    />

                    <div className="vehicle-image-overlay" />

                    <span className="vehicle-type">
                      {vehicle.type}
                    </span>

                    {vehicle.popular && (
                      <span className="popular-badge">
                        Most Popular
                      </span>
                    )}

                  </div>


                  {/* CONTENT */}

                  <div className="vehicle-card-content">

                    <div className="vehicle-card-title">

                      <h3>
                        {vehicle.name}
                      </h3>

                      <p>
                        {vehicle.description}
                      </p>

                    </div>


                    {/* FEATURES */}

                    <div className="vehicle-features">

                      <span>
                        👥 {vehicle.seats}
                      </span>

                      <span>
                        ✓ {vehicle.service}
                      </span>

                      <span>
                        ❄ AC
                      </span>

                    </div>


                    {/* PRICING */}

                    <div className="vehicle-pricing">

                      <div className="vehicle-price-box">

                        <span>
                          Airport Transfer
                        </span>

                        <strong>
                          {vehicle.airport}
                        </strong>

                      </div>


                      <div className="vehicle-price-box">

                        <span>
                          Full Day Rental
                        </span>

                        <strong>
                          {vehicle.fullDay}
                        </strong>

                      </div>

                    </div>


                    {/* DURATION */}

                    <div className="vehicle-duration">

                      <span>
                        ◷
                      </span>

                      {vehicle.duration}

                    </div>


                    {/* BOOK BUTTON */}

                    <a
                      href="#contact"
                      className="vehicle-book-btn"
                    >
                      Check Availability

                      <span>
                        →
                      </span>

                    </a>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="no-vehicle-found">

              <h3>
                No vehicles found
              </h3>

              <p>
                Try changing your search or filters.
              </p>

              <button
                className="vehicle-secondary-btn"
                onClick={clearFilters}
              >
                View All Vehicles
              </button>

            </div>

          )}

        </div>

      </section>


      {/* ================= MODERN CTA ================= */}

      <section
        className="vehicle-cta"
        id="contact"
      >

        <div className="vehicle-container">

          <div className="vehicle-cta-box">

            <div className="vehicle-cta-content">

              <span className="vehicle-section-label">
                READY TO TRAVEL?
              </span>

              <h2>
                Your journey starts
                <br />
                with the right ride.
              </h2>

              <p>
                Tell us your destination, travel date and
                group size. We'll help you find the perfect
                vehicle for your Nepal journey.
              </p>

            </div>


            <div className="vehicle-cta-actions">

              <a
                href="https://wa.me/9779800000000"
                className="vehicle-primary-btn"
                target="_blank"
                rel="noreferrer"
              >
                Plan Your Journey
                <span>↗</span>
              </a>

              <Link
                to="/"
                className="vehicle-secondary-btn"
              >
                Back to Home
              </Link>

            </div>

          </div>


          {/* ================= COMPACT FOOTER ================= */}

          <footer className="vehicle-mini-footer">

            <div className="mini-footer-brand">

              <strong>
                Backpacker Gateways
              </strong>

              <span>
                Explore Nepal your way.
              </span>

            </div>


            <div className="mini-footer-links">

              <Link to="/">
                Home
              </Link>

              <Link to="/rooms">
                Stays
              </Link>

              <Link to="/gear">
                Gear
              </Link>

              <Link to="/vehicles">
                Vehicles
              </Link>

            </div>


            <div className="mini-footer-copy">
              © 2026 Backpacker Gateways
            </div>

          </footer>

        </div>

      </section>

    </main>
  );
}