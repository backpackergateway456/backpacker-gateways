import { Link } from "react-router-dom";
import "./VehicleRental.css";

const vehicles = [
  {
    id: 1,
    name: "Premium Sedan",
    type: "Car / Sedan",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=85",
    seats: "4 Seats",
    service: "Private Driver",
    airport: "$40",
    fullDay: "$130",
    duration: "200 km / 10 hours",
    description:
      "Comfortable private sedan for airport transfers, city tours and short-distance Nepal travel.",
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    type: "Jeep / 4x4",
    image:
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1200&q=85",
    seats: "6–7 Seats",
    service: "Private Driver",
    airport: "$50",
    fullDay: "$160",
    duration: "200 km / 10 hours",
    description:
      "Powerful 4x4 vehicle designed for mountain roads, long journeys and adventure travel.",
  },
  {
    id: 3,
    name: "Toyota Innova Crysta",
    type: "Premium MPV",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=85",
    seats: "6–7 Seats",
    service: "Private Driver",
    airport: "$60",
    fullDay: "$100",
    duration: "Full Day Service",
    description:
      "Premium and spacious family vehicle for comfortable sightseeing and private tours.",
  },
  {
    id: 4,
    name: "Toyota Hiace",
    type: "Tourist Van",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=85",
    seats: "12–14 Seats",
    service: "Private Driver",
    airport: "$100",
    fullDay: "$60",
    duration: "Full Day Service",
    description:
      "Spacious tourist van ideal for families, groups and multi-day Nepal journeys.",
  },
  {
    id: 5,
    name: "Mahindra Scorpio",
    type: "SUV / 4x4",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    seats: "6–7 Seats",
    service: "Private Driver",
    airport: "$100",
    fullDay: "$100",
    duration: "Full Day Service",
    description:
      "Reliable SUV for mountain destinations, sightseeing and comfortable road trips.",
  },
  {
    id: 6,
    name: "Luxury Tourist Bus",
    type: "Tourist Coach",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
    seats: "25–35 Seats",
    service: "Professional Driver",
    airport: "$80",
    fullDay: "$120",
    duration: "Full Day Service",
    description:
      "Comfortable tourist coach for groups, corporate tours, pilgrimages and large family trips.",
  },
];

export default function VehicleRental() {
  return (
    <div className="vehicle-page">
      {/* HERO */}
      <section className="vehicle-hero">
        <div className="vehicle-hero-overlay"></div>

        <div className="vehicle-hero-content">
          <span className="vehicle-eyebrow">
            BACKPACKER GATEWAYS
          </span>

          <h1>
            Travel Nepal
            <br />
            <span>Comfortably.</span>
          </h1>

          <p>
            Premium tourist vehicles with professional drivers for
            airport transfers, sightseeing, trekking routes and
            long-distance journeys across Nepal.
          </p>

          <div className="vehicle-hero-actions">
            <a href="#vehicles" className="vehicle-primary-btn">
              Explore Vehicles
            </a>

            <a href="#contact" className="vehicle-secondary-btn">
              Enquire Now
            </a>
          </div>
        </div>

        <div className="vehicle-hero-bottom">
          <div>
            <strong>Airport Transfers</strong>
            <span>Reliable pickup & drop</span>
          </div>

          <div>
            <strong>Private Driver</strong>
            <span>Professional service</span>
          </div>

          <div>
            <strong>Nepal Wide</strong>
            <span>Travel anywhere</span>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="vehicle-intro">
        <div className="vehicle-container">
          <div className="vehicle-intro-grid">
            <div>
              <span className="vehicle-section-label">
                TOURIST VEHICLE RENTAL
              </span>

              <h2>
                The right vehicle
                <br />
                for every journey.
              </h2>
            </div>

            <div className="vehicle-intro-text">
              <p>
                From airport pickup to Himalayan road trips,
                choose a vehicle that matches your group, route
                and travel style.
              </p>

              <p>
                All our rental services are designed to make your
                journey across Nepal safe, comfortable and simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLES */}
      <section className="vehicle-list-section" id="vehicles">
        <div className="vehicle-container">
          <div className="vehicle-section-heading">
            <div>
              <span className="vehicle-section-label">
                OUR FLEET
              </span>

              <h2>Choose your vehicle</h2>
            </div>

            <p>
              Airport transfers, full-day rentals and private
              journeys across Nepal.
            </p>
          </div>

          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <article className="vehicle-card" key={vehicle.id}>
                <div className="vehicle-image-wrap">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    loading="lazy"
                  />

                  <span className="vehicle-type">
                    {vehicle.type}
                  </span>
                </div>

                <div className="vehicle-card-content">
                  <div className="vehicle-card-title">
                    <div>
                      <h3>{vehicle.name}</h3>
                      <p>{vehicle.description}</p>
                    </div>
                  </div>

                  <div className="vehicle-features">
                    <span>{vehicle.seats}</span>
                    <span>{vehicle.service}</span>
                    <span>AC</span>
                  </div>

                  <div className="vehicle-pricing">
                    <div className="vehicle-price-box">
                      <span>Airport Pickup / Drop</span>
                      <strong>{vehicle.airport}</strong>
                    </div>

                    <div className="vehicle-price-box">
                      <span>Full Day</span>
                      <strong>{vehicle.fullDay}</strong>
                    </div>
                  </div>

                  <div className="vehicle-duration">
                    <span>{vehicle.duration}</span>
                  </div>

                  <a
                    href="#contact"
                    className="vehicle-book-btn"
                  >
                    Book / Enquire
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE STRIP */}
      <section className="vehicle-services">
        <div className="vehicle-container">
          <div className="vehicle-services-grid">
            <div>
              <span className="service-number">01</span>
              <h3>Airport Transfers</h3>
              <p>
                Comfortable pickup and drop service from
                Kathmandu airport.
              </p>
            </div>

            <div>
              <span className="service-number">02</span>
              <h3>Private Tours</h3>
              <p>
                Explore Nepal at your own pace with a private
                vehicle and driver.
              </p>
            </div>

            <div>
              <span className="service-number">03</span>
              <h3>Group Travel</h3>
              <p>
                Comfortable transportation for families,
                friends and large groups.
              </p>
            </div>

            <div>
              <span className="service-number">04</span>
              <h3>Mountain Routes</h3>
              <p>
                Reliable vehicles for demanding Himalayan
                roads and destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vehicle-cta" id="contact">
        <div className="vehicle-cta-overlay"></div>

        <div className="vehicle-cta-content">
          <span className="vehicle-eyebrow">
            READY TO TRAVEL?
          </span>

          <h2>
            Your journey.
            <br />
            Our wheels.
          </h2>

          <p>
            Tell us your destination, date and group size.
            We will recommend the right vehicle for your trip.
          </p>

          <div className="vehicle-cta-actions">
            <a
              href="https://wa.me/9779800000000"
              className="vehicle-primary-btn"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>

            <Link to="/" className="vehicle-secondary-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}