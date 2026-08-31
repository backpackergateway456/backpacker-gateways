import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRoom } from "../services/roomApi";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoom = async () => {
      if (!id) {
        setError("No room selected.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const result = await getRoom(id);

        if (result?.success === false || !result?.data) {
          throw new Error("Room not found");
        }

        setRoom(result.data);
      } catch (err) {
        console.error("Room details error:", err);
        setError("Unable to load room details.");
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  const handleBooking = () => {
    if (!room?._id || !room?.available) return;

    navigate(`/booking?room=${room._id}`);
  };

  if (loading) {
    return (
      <>
        <style>{`
          .details-loading {
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #f7f8f6;
            color: #68716b;
            font-family: Arial, Helvetica, sans-serif;
          }

          .spinner {
            width: 42px;
            height: 42px;
            border: 3px solid #ddd;
            border-top-color: #8b6b3f;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 18px;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <div className="details-loading">
          <div className="spinner"></div>
          <p>Preparing your Himalayan stay...</p>
        </div>
      </>
    );
  }

  if (error || !room) {
    return (
      <>
        <style>{`
          .details-error {
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px 20px;
            background: #f7f8f6;
            font-family: Arial, Helvetica, sans-serif;
          }

          .details-error h2 {
            margin: 0 0 10px;
            color: #18231d;
            font-size: 32px;
          }

          .details-error p {
            margin: 0;
            color: #68716b;
          }

          .back-button {
            display: inline-block;
            margin-top: 25px;
            padding: 13px 22px;
            border-radius: 10px;
            background: #18231d;
            color: white;
            text-decoration: none;
            font-size: 13px;
            font-weight: 700;
          }

          .back-button:hover {
            background: #8b6b3f;
          }
        `}</style>

        <div className="details-error">
          <h2>No room selected</h2>
          <p>{error || "The requested room could not be found."}</p>

          <Link to="/rooms" className="back-button">
            ← Back to Rooms
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .details-page {
          background: #f7f8f6;
          min-height: 100vh;
          font-family: Arial, Helvetica, sans-serif;
          color: #18231d;
        }

        .details-hero {
          position: relative;
          min-height: 520px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          background: #18231d;
        }

        .details-hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .details-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to top,
              rgba(0, 0, 0, 0.78),
              rgba(0, 0, 0, 0.15)
            );
        }

        .details-hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1250px;
          margin: 0 auto;
          padding: 70px 6% 55px;
          box-sizing: border-box;
        }

        .details-back {
          display: inline-block;
          margin-bottom: 25px;
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          opacity: 0.9;
        }

        .details-back:hover {
          opacity: 1;
        }

        .details-availability {
          display: inline-block;
          padding: 8px 13px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.95);
          color: #28613b;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .details-availability.unavailable {
          color: #9b3636;
        }

        .details-hero h1 {
          margin: 0 0 15px;
          color: white;
          font-size: clamp(38px, 6vw, 68px);
          line-height: 1.05;
        }

        .details-hero-description {
          max-width: 700px;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 17px;
          line-height: 1.7;
        }

        .details-container {
          max-width: 1250px;
          margin: 0 auto;
          padding: 70px 6% 100px;
          box-sizing: border-box;
        }

        .details-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          gap: 55px;
          align-items: start;
        }

        .section-label {
          display: inline-block;
          margin-bottom: 12px;
          color: #8b6b3f;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .content-section h2 {
          margin: 0 0 18px;
          color: #18231d;
          font-size: 32px;
          line-height: 1.2;
        }

        .content-section > p {
          max-width: 760px;
          margin: 0 0 40px;
          color: #68716b;
          font-size: 16px;
          line-height: 1.8;
        }

        .room-highlights {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 55px;
        }

        .highlight {
          padding: 22px;
          background: white;
          border: 1px solid #e3e7e2;
          border-radius: 15px;
        }

        .highlight-icon {
          margin-bottom: 12px;
          font-size: 24px;
        }

        .highlight strong {
          display: block;
          margin-bottom: 5px;
          color: #18231d;
          font-size: 14px;
        }

        .highlight span {
          color: #68716b;
          font-size: 13px;
          line-height: 1.5;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 25px;
        }

        .amenity-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background: white;
          border: 1px solid #e3e7e2;
          border-radius: 12px;
          color: #46524a;
          font-size: 14px;
        }

        .amenity-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: #eef2ed;
          color: #28613b;
          font-weight: 700;
        }

        .booking-card {
          position: sticky;
          top: 25px;
          padding: 30px;
          background: white;
          border: 1px solid #e2e6e1;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(24, 35, 29, 0.08);
        }

        .booking-card h3 {
          margin: 0 0 8px;
          color: #18231d;
          font-size: 25px;
        }

        .booking-subtitle {
          margin: 0 0 25px;
          color: #68716b;
          font-size: 13px;
          line-height: 1.6;
        }

        .price-box {
          padding: 20px 0;
          border-top: 1px solid #eceeeb;
          border-bottom: 1px solid #eceeeb;
        }

        .price {
          color: #8b6b3f;
          font-size: 29px;
          font-weight: 700;
        }

        .per-night {
          color: #8b918d;
          font-size: 13px;
        }

        .availability-status {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 20px 0;
          color: #536058;
          font-size: 13px;
        }

        .available-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #28613b;
        }

        .unavailable-dot {
          background: #9b3636;
        }

        .book-now {
          width: 100%;
          border: 0;
          padding: 15px 20px;
          border-radius: 10px;
          background: #18231d;
          color: white;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .book-now:hover:not(:disabled) {
          background: #8b6b3f;
          transform: translateY(-2px);
        }

        .book-now:disabled {
          background: #a8ada9;
          cursor: not-allowed;
        }

        .booking-note {
          margin: 17px 0 0;
          color: #8b918d;
          font-size: 11px;
          line-height: 1.6;
          text-align: center;
        }

        .back-rooms {
          display: block;
          margin-top: 18px;
          color: #536058;
          text-align: center;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
        }

        .back-rooms:hover {
          color: #8b6b3f;
        }

        @media (max-width: 900px) {
          .details-grid {
            grid-template-columns: 1fr;
          }

          .booking-card {
            position: static;
          }
        }

        @media (max-width: 650px) {
          .details-hero {
            min-height: 470px;
          }

          .details-container {
            padding: 50px 18px 70px;
          }

          .details-hero-content {
            padding: 50px 18px 40px;
          }

          .room-highlights {
            grid-template-columns: 1fr;
          }

          .amenities-grid {
            grid-template-columns: 1fr;
          }

          .details-hero h1 {
            font-size: 40px;
          }
        }
      `}</style>

      <div className="details-page">

        {/* HERO */}
        <section className="details-hero">

          {room.images?.length > 0 && (
            <img
              className="details-hero-image"
              src={room.images[0]}
              alt={room.name}
            />
          )}

          <div className="details-hero-overlay"></div>

          <div className="details-hero-content">

            <Link to="/rooms" className="details-back">
              ← Back to Rooms
            </Link>

            <div
              className={`details-availability ${
                !room.available ? "unavailable" : ""
              }`}
            >
              {room.available
                ? "Available Now"
                : "Currently Unavailable"}
            </div>

            <h1>{room.name}</h1>

            <p className="details-hero-description">
              {room.description}
            </p>

          </div>

        </section>

        {/* CONTENT */}
        <main className="details-container">

          <div className="details-grid">

            <div className="content-section">

              <span className="section-label">
                Your Himalayan Stay
              </span>

              <h2>
                Comfort surrounded by the mountains.
              </h2>

              <p>
                Wake up to peaceful surroundings, warm
                hospitality and the beauty of the Himalayas.
                Our rooms are thoughtfully designed for
                travellers who want comfort, convenience
                and an authentic mountain experience.
              </p>

              {/* HIGHLIGHTS */}
              <div className="room-highlights">

                <div className="highlight">
                  <div className="highlight-icon">
                    👥
                  </div>

                  <strong>Guests</strong>

                  <span>
                    Up to {room.capacity} guests
                  </span>
                </div>

                <div className="highlight">
                  <div className="highlight-icon">
                    🛏️
                  </div>

                  <strong>Sleeping</strong>

                  <span>
                    {room.beds}
                  </span>
                </div>

                <div className="highlight">
                  <div className="highlight-icon">
                    🏔️
                  </div>

                  <strong>Experience</strong>

                  <span>
                    Himalayan stay
                  </span>
                </div>

              </div>

              {/* AMENITIES */}
              <span className="section-label">
                Room Amenities
              </span>

              <h2>
                Everything you need.
              </h2>

              <div className="amenities-grid">

                {room.amenities?.length > 0 ? (
                  room.amenities.map((amenity, index) => (
                    <div
                      className="amenity-card"
                      key={`${room._id}-${index}`}
                    >
                      <span className="amenity-icon">
                        ✓
                      </span>

                      <span>
                        {amenity}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>
                    Standard room amenities are available.
                  </p>
                )}

              </div>

            </div>

            {/* BOOKING CARD */}
            <aside className="booking-card">

              <h3>
                Reserve this room
              </h3>

              <p className="booking-subtitle">
                Plan your Himalayan escape with us.
              </p>

              <div className="price-box">

                <span className="price">
                  NPR{" "}
                  {Number(room.price || 0).toLocaleString(
                    "en-NP"
                  )}
                </span>

                <span className="per-night">
                  {" "} / night
                </span>

              </div>

              <div className="availability-status">

                <span
                  className={`available-dot ${
                    !room.available
                      ? "unavailable-dot"
                      : ""
                  }`}
                ></span>

                {room.available
                  ? "Room available for booking"
                  : "Currently unavailable"}

              </div>

              <button
                type="button"
                className="book-now"
                disabled={!room.available}
                onClick={handleBooking}
              >
                {room.available
                  ? "Book This Room →"
                  : "Currently Unavailable"}
              </button>

              <p className="booking-note">
                Best rates available when booking
                directly with Himalayan Backpacker House.
              </p>

              <Link
                to="/rooms"
                className="back-rooms"
              >
                ← Browse All Rooms
              </Link>

            </aside>

          </div>

        </main>

      </div>
    </>
  );
};

export default RoomDetails;