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
  return (
    <main className="vehicle-page">

      {/* ================= HERO ================= */}

      <section className="vehicle-hero">
        <div className="vehicle-hero-overlay" />

        <div className="vehicle-hero-pattern">
          <span />
          <span />
          <span />
        </div>

        <div className="vehicle-container vehicle-hero-layout">

          <div className="vehicle-hero-content">

            <div className="vehicle-eyebrow">
              <span className="eyebrow-dot" />
              BACKPACKER GATEWAYS
            </div>

            <h1>
              Explore Nepal.
              <br />
              <span>Your Way.</span>
            </h1>

            <p>
              Premium tourist vehicles with professional drivers
              for airport transfers, private tours and unforgettable
              journeys across Nepal.
            </p>

            <div className="vehicle-hero-actions">

              <a
                href="#vehicles"
                className="vehicle-primary-btn"
              >
                Explore Our Fleet
                <span>→</span>
              </a>

              <a
                href="#contact"
                className="vehicle-secondary-btn"
              >
                Plan Your Journey
              </a>

            </div>

          </div>

          {/* HERO FLOATING CARD */}

          <div className="hero-vehicle-card">

            <div className="hero-card-top">
              <span>PREMIUM TRAVEL</span>
              <strong>24/7</strong>
            </div>

            <div className="hero-card-main">

              <div className="hero-card-icon">
                🚐
              </div>

              <div>
                <strong>Travel Made Easy</strong>

                <span>
                  Safe · Comfortable · Reliable
                </span>
              </div>

            </div>

            <div className="hero-card-line" />

            <div className="hero-card-stats">

              <div>
                <strong>6+</strong>
                <span>Vehicle Types</span>
              </div>

              <div>
                <strong>All Nepal</strong>
                <span>Travel Coverage</span>
              </div>

            </div>

          </div>

        </div>


        {/* HERO TRUST BAR */}

        <div className="vehicle-hero-bottom">

          <div>

            <span className="trust-icon">
              ✦
            </span>

            <div>
              <strong>Airport Transfers</strong>
              <span>Pickup & drop service</span>
            </div>

          </div>


          <div>

            <span className="trust-icon">
              ✦
            </span>

            <div>
              <strong>Professional Drivers</strong>
              <span>Experienced local experts</span>
            </div>

          </div>


          <div>

            <span className="trust-icon">
              ✦
            </span>

            <div>
              <strong>Travel Across Nepal</strong>
              <span>Your journey, your schedule</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="vehicle-intro">

        <div className="vehicle-container">

          <div className="vehicle-intro-grid">

            <div className="vehicle-intro-title">

              <span className="vehicle-section-label">
                TOURIST VEHICLE RENTAL
              </span>

              <h2>
                Every journey
                <br />
                deserves the
                <span> right ride.</span>
              </h2>

            </div>


            <div className="vehicle-intro-text">

              <p>
                Whether you are arriving in Kathmandu,
                exploring cultural destinations or travelling
                deep into the Himalayas, we have a vehicle
                designed for your journey.
              </p>

              <div className="intro-mini-features">

                <span>✓ Transparent Pricing</span>

                <span>✓ Private Vehicles</span>

                <span>✓ Experienced Drivers</span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= VEHICLE LIST ================= */}

      <section
        className="vehicle-list-section"
        id="vehicles"
      >

        <div className="vehicle-container">

          <div className="vehicle-section-heading">

            <div>

              <span className="vehicle-section-label">
                OUR VEHICLE COLLECTION
              </span>

              <h2>
                Find your perfect ride
              </h2>

            </div>


            <div className="fleet-info">

              <span>
                From solo travellers to large groups.
              </span>

              <strong>
                6 Premium Vehicle Options
              </strong>

            </div>

          </div>


          <div className="vehicle-grid">

            {vehicles.map((vehicle) => (

              <article
                className="vehicle-card"
                key={vehicle.id}
              >

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


                <div className="vehicle-card-content">

                  <div className="vehicle-card-title">

                    <div>

                      <h3>
                        {vehicle.name}
                      </h3>

                      <p>
                        {vehicle.description}
                      </p>

                    </div>

                  </div>


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


                  <div className="vehicle-duration">

                    <span>
                      ◷
                    </span>

                    {vehicle.duration}

                  </div>


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

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section className="vehicle-services">

        <div className="vehicle-container">

          <div className="services-heading">

            <span className="vehicle-section-label">
              MORE THAN TRANSPORT
            </span>

            <h2>
              Travel with confidence.
            </h2>

          </div>


          <div className="vehicle-services-grid">

            <div>

              <span className="service-number">
                01
              </span>

              <h3>
                Airport Transfers
              </h3>

              <p>
                Smooth and reliable airport pickup
                and drop service.
              </p>

            </div>


            <div>

              <span className="service-number">
                02
              </span>

              <h3>
                Private Tours
              </h3>

              <p>
                Explore Nepal at your own pace with
                your own private vehicle.
              </p>

            </div>


            <div>

              <span className="service-number">
                03
              </span>

              <h3>
                Group Travel
              </h3>

              <p>
                Comfortable transportation for families,
                friends and larger groups.
              </p>

            </div>


            <div>

              <span className="service-number">
                04
              </span>

              <h3>
                Himalayan Routes
              </h3>

              <p>
                Reliable vehicles for mountain roads
                and adventurous destinations.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MODERN CTA ================= */}

      <section
        className="vehicle-cta"
        id="contact"
      >

        <div className="vehicle-cta-pattern">
          <span />
          <span />
        </div>

        <div className="vehicle-container">

          <div className="vehicle-cta-box">

            <div className="vehicle-cta-content">

              <span className="vehicle-eyebrow">
                READY FOR THE ROAD?
              </span>

              <h2>
                Nepal is waiting.
                <br />
                <span>Let's get moving.</span>
              </h2>

              <p>
                Tell us your travel date, destination
                and group size. Our team will help you
                choose the perfect vehicle.
              </p>

            </div>


            <div className="vehicle-cta-actions">

              <a
                href="https://wa.me/9779800000000"
                className="vehicle-primary-btn"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Us
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


          {/* FOOTER STYLE MINI INFO */}

          <div className="vehicle-footer-info">

            <div>

              <strong>
                Backpacker Gateways
              </strong>

              <span>
                Explore Nepal your way.
              </span>

            </div>


            <div className="vehicle-footer-links">

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


            <div className="vehicle-footer-copy">
              © 2026 Backpacker Gateways
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}