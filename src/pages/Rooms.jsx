import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../services/roomApi";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchInfo, setSearchInfo] = useState(null);
  const [isSearchResult, setIsSearchResult] = useState(false);

  // =====================================================
  // LOAD ROOMS
  // =====================================================

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        setError("");

        const savedSearch = sessionStorage.getItem("roomSearch");
        const savedResults = sessionStorage.getItem("roomSearchResults");

        // -------------------------------------------------
        // LOAD SAVED SEARCH RESULTS
        // -------------------------------------------------

        if (savedSearch && savedResults) {
          try {
            const parsedSearch = JSON.parse(savedSearch);
            const parsedResults = JSON.parse(savedResults);

            setSearchInfo(parsedSearch);

            setRooms(
              Array.isArray(parsedResults)
                ? parsedResults
                : []
            );

            setIsSearchResult(true);
            setLoading(false);

            return;
          } catch (storageError) {
            console.warn(
              "Saved room search could not be read:",
              storageError
            );

            sessionStorage.removeItem("roomSearch");
            sessionStorage.removeItem("roomSearchResults");
          }
        }

        // -------------------------------------------------
        // NORMAL ROOMS PAGE
        // -------------------------------------------------

        const result = await getRooms();

        if (result?.success === false) {
          throw new Error(
            result?.message || "Unable to load rooms."
          );
        }

        setRooms(
          Array.isArray(result?.data)
            ? result.data
            : []
        );

        setIsSearchResult(false);
        setSearchInfo(null);
      } catch (err) {
        console.error("Rooms loading error:", err);

        setError(
          "Unable to load rooms. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  const clearSearch = async () => {
    try {
      setLoading(true);
      setError("");

      sessionStorage.removeItem("roomSearch");
      sessionStorage.removeItem("roomSearchResults");

      const result = await getRooms();

      if (result?.success === false) {
        throw new Error(
          result?.message || "Unable to reload rooms."
        );
      }

      setRooms(
        Array.isArray(result?.data)
          ? result.data
          : []
      );

      setSearchInfo(null);
      setIsSearchResult(false);
    } catch (err) {
      console.error("Clear search error:", err);

      setError("Unable to reload rooms.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const selectedDate = new Date(
      date + "T00:00:00"
    );

    if (Number.isNaN(selectedDate.getTime())) {
      return date;
    }

    return selectedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // IMAGE ERROR FALLBACK
  // =====================================================

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";

    const parent = event.currentTarget.parentElement;

    if (parent) {
      parent.classList.add("image-error");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <>
        <style>{`
          .rooms-loading {
            min-height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: #f7f8f6;
            font-family: Arial, Helvetica, sans-serif;
          }

          .loading-spinner {
            width: 38px;
            height: 38px;
            border: 3px solid #ddd;
            border-top-color: #8b6b3f;
            border-radius: 50%;
            animation: roomsSpin 0.8s linear infinite;
            margin-bottom: 15px;
          }

          .rooms-loading p {
            margin: 0;
            color: #68716b;
            font-size: 14px;
          }

          @keyframes roomsSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <section className="rooms-loading">
          <div className="loading-spinner"></div>

          <p>
            Finding the perfect Himalayan stay...
          </p>
        </section>
      </>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <>
        <style>{`
          .rooms-error {
            min-height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px 20px;
            background: #f7f8f6;
            font-family: Arial, Helvetica, sans-serif;
          }

          .rooms-error h2 {
            margin: 0 0 10px;
            color: #18231d;
            font-size: 30px;
          }

          .rooms-error p {
            margin: 0;
            color: #68716b;
          }

          .rooms-error button {
            margin-top: 25px;
            border: 0;
            background: #18231d;
            color: white;
            padding: 13px 22px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 700;
          }

          .rooms-error button:hover {
            background: #8b6b3f;
          }
        `}</style>

        <section className="rooms-error">
          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </section>
      </>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <style>{`
        .rooms-section {
          padding: 90px 6%;
          background: #f7f8f6;
          font-family: Arial, Helvetica, sans-serif;
          min-height: 70vh;
        }

        .rooms-container {
          max-width: 1250px;
          margin: 0 auto;
        }

        /* ==========================================
           HEADER
        ========================================== */

        .rooms-heading {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 35px;
        }

        .rooms-label {
          display: inline-block;
          margin-bottom: 12px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8b6b3f;
        }

        .rooms-heading h1 {
          margin: 0 0 18px;
          font-size: clamp(36px, 5vw, 58px);
          line-height: 1.05;
          color: #18231d;
          font-weight: 700;
        }

        .rooms-heading p {
          margin: 0;
          color: #68716b;
          font-size: 17px;
          line-height: 1.7;
        }

        /* ==========================================
           SEARCH SUMMARY
        ========================================== */

        .search-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 18px 20px;
          margin: 0 auto 38px;
          max-width: 1050px;
          background: #ffffff;
          border: 1px solid #e3e7e2;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(24, 35, 29, 0.05);
        }

        .search-summary-left {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
        }

        .search-summary-title {
          color: #18231d;
          font-size: 14px;
          font-weight: 700;
          margin-right: 5px;
        }

        .search-chip {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 30px;
          background: #f3f5f2;
          color: #46524a;
          font-size: 12px;
          font-weight: 600;
        }

        .clear-search {
          flex-shrink: 0;
          border: 1px solid #d7ddd7;
          background: white;
          color: #26332b;
          padding: 10px 15px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .clear-search:hover {
          background: #18231d;
          border-color: #18231d;
          color: white;
        }

        /* ==========================================
           RESULTS COUNT
        ========================================== */

        .results-count {
          margin-bottom: 20px;
          color: #68716b;
          font-size: 14px;
        }

        .results-count strong {
          color: #18231d;
        }

        /* ==========================================
           GRID
        ========================================== */

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* ==========================================
           ROOM CARD
        ========================================== */

        .room-card {
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e5e8e4;
          border-radius: 22px;
          box-shadow: 0 12px 35px rgba(24, 35, 29, 0.07);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .room-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(24, 35, 29, 0.13);
        }

        /* ==========================================
           IMAGE
        ========================================== */

        .room-image {
          position: relative;
          height: 260px;
          overflow: hidden;
          background: #dfe4df;
        }

        .room-image.image-error::after {
          content: "Himalayan Backpacker House";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #dce5df,
            #b9c8bd
          );
          color: #425249;
          font-size: 15px;
          font-weight: 600;
        }

        .room-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .room-card:hover .room-image img {
          transform: scale(1.06);
        }

        .room-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #dce5df,
            #b9c8bd
          );
          color: #425249;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
        }

        /* ==========================================
           AVAILABILITY
        ========================================== */

        .availability {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 2;
          padding: 8px 13px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.94);
          color: #28613b;
          font-size: 12px;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .availability.unavailable {
          color: #9b3636;
        }

        /* ==========================================
           CONTENT
        ========================================== */

        .room-content {
          padding: 25px;
        }

        .room-title-row {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .room-title {
          margin: 0;
          color: #18231d;
          font-size: 23px;
          line-height: 1.25;
        }

        .room-price {
          flex-shrink: 0;
          text-align: right;
        }

        .room-price strong {
          display: block;
          color: #8b6b3f;
          font-size: 21px;
        }

        .room-price span {
          color: #8b918d;
          font-size: 11px;
        }

        /* ==========================================
           DESTINATION
        ========================================== */

        .room-destination {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 14px;
          color: #8b6b3f;
          font-size: 12px;
          font-weight: 700;
        }

        .room-description {
          margin: 0 0 20px;
          color: #6c746f;
          line-height: 1.65;
          font-size: 14px;
        }

        /* ==========================================
           ROOM INFO
        ========================================== */

        .room-info {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eceeeb;
        }

        .info-item {
          padding: 8px 11px;
          background: #f5f7f4;
          border-radius: 9px;
          color: #4d5751;
          font-size: 12px;
          font-weight: 600;
        }

        /* ==========================================
           AMENITIES
        ========================================== */

        .amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 18px 0 22px;
        }

        .amenity {
          color: #59635d;
          font-size: 12px;
        }

        .amenity:not(:last-child)::after {
          content: "•";
          margin-left: 7px;
          color: #a3aaa5;
        }

        /* ==========================================
           ACTIONS
        ========================================== */

        .room-actions {
          display: flex;
          gap: 10px;
        }

        .room-btn {
          flex: 1;
          padding: 13px 15px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          transition: 0.25s ease;
          box-sizing: border-box;
        }

        .details-btn {
          border: 1px solid #d8ddd8;
          color: #26332b;
          background: white;
        }

        .details-btn:hover {
          background: #f2f4f1;
          transform: translateY(-2px);
        }

        .book-btn {
          border: 1px solid #18231d;
          background: #18231d;
          color: white;
        }

        .book-btn:hover {
          background: #8b6b3f;
          border-color: #8b6b3f;
          transform: translateY(-2px);
        }

        .book-btn.disabled {
          border-color: #d8ddd8;
          background: #ecefeb;
          color: #8b918d;
          cursor: not-allowed;
        }

        .book-btn.disabled:hover {
          transform: none;
          background: #ecefeb;
          border-color: #d8ddd8;
        }

        /* ==========================================
           NO RESULTS
        ========================================== */

        .no-results {
          max-width: 650px;
          margin: 25px auto 0;
          padding: 55px 30px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e3e7e2;
          border-radius: 22px;
          box-shadow: 0 12px 35px rgba(24, 35, 29, 0.05);
        }

        .no-results-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f5f2;
          color: #68716b;
          font-size: 24px;
        }

        .no-results h2 {
          margin: 0 0 10px;
          color: #18231d;
          font-size: 27px;
        }

        .no-results p {
          margin: 0 auto;
          max-width: 480px;
          color: #68716b;
          font-size: 14px;
          line-height: 1.7;
        }

        .no-results button {
          margin-top: 25px;
          border: 0;
          background: #18231d;
          color: white;
          padding: 13px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .no-results button:hover {
          background: #8b6b3f;
        }

        /* ==========================================
           RESPONSIVE
        ========================================== */

        @media (max-width: 1000px) {
          .rooms-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .search-summary {
            flex-direction: column;
            align-items: stretch;
          }

          .clear-search {
            width: 100%;
          }
        }

        @media (max-width: 650px) {
          .rooms-section {
            padding: 60px 18px;
          }

          .rooms-grid {
            grid-template-columns: 1fr;
          }

          .room-image {
            height: 230px;
          }

          .room-title-row {
            flex-direction: column;
          }

          .room-price {
            text-align: left;
          }

          .search-summary-left {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-chip {
            width: 100%;
            box-sizing: border-box;
          }

          .room-actions {
            flex-direction: column;
          }
        }
      `}</style>

      <section className="rooms-section">
        <div className="rooms-container">

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="rooms-heading">
            <span className="rooms-label">
              {isSearchResult
                ? "Your Search"
                : "Stay With Us"}
            </span>

            <h1>
              {isSearchResult
                ? "Your Perfect Stay"
                : "Rooms & Stays"}
            </h1>

            <p>
              {isSearchResult
                ? "Explore stays selected around your search preferences and discover a comfortable base for your Himalayan journey."
                : "Relax, recharge and experience warm Himalayan hospitality in the heart of your journey."}
            </p>
          </div>

          {/* ==========================================
              SEARCH SUMMARY
          ========================================== */}

          {isSearchResult && searchInfo && (
            <div className="search-summary">

              <div className="search-summary-left">

                <span className="search-summary-title">
                  Searching for
                </span>

                {searchInfo.destination && (
                  <span className="search-chip">
                    📍 {searchInfo.destination}
                  </span>
                )}

                {searchInfo.checkIn && (
                  <span className="search-chip">
                    {formatDate(searchInfo.checkIn)}
                  </span>
                )}

                {searchInfo.checkOut && (
                  <span className="search-chip">
                    → {formatDate(searchInfo.checkOut)}
                  </span>
                )}

                {searchInfo.guests && (
                  <span className="search-chip">
                    👥 {searchInfo.guests}{" "}
                    {Number(searchInfo.guests) === 1
                      ? "Guest"
                      : "Guests"}
                  </span>
                )}

              </div>

              <button
                type="button"
                className="clear-search"
                onClick={clearSearch}
              >
                View All Rooms
              </button>

            </div>
          )}

          {/* ==========================================
              RESULT COUNT
          ========================================== */}

          {rooms.length > 0 && (
            <div className="results-count">
              <strong>{rooms.length}</strong>{" "}
              {rooms.length === 1
                ? "room available"
                : "rooms available"}
            </div>
          )}

          {/* ==========================================
              ROOM GRID
          ========================================== */}

          {rooms.length > 0 ? (
            <div className="rooms-grid">

              {rooms.map((room) => {

                const hasImage =
                  Array.isArray(room.images) &&
                  room.images.length > 0 &&
                  room.images[0];

                const hasAmenities =
                  Array.isArray(room.amenities) &&
                  room.amenities.length > 0;

                return (
                  <article
                    className="room-card"
                    key={room._id}
                  >

                    {/* ==================================
                        ROOM IMAGE
                    ================================== */}

                    <div className="room-image">

                      {hasImage ? (
                        <img
                          src={room.images[0]}
                          alt={room.name || "Room"}
                          loading="lazy"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="room-image-placeholder">
                          Himalayan Backpacker House
                        </div>
                      )}

                      <span
                        className={
                          "availability " +
                          (!room.available
                            ? "unavailable"
                            : "")
                        }
                      >
                        {room.available
                          ? "● Available"
                          : "● Not Available"}
                      </span>

                    </div>

                    {/* ==================================
                        ROOM CONTENT
                    ================================== */}

                    <div className="room-content">

                      <div className="room-title-row">

                        <h2 className="room-title">
                          {room.name}
                        </h2>

                        <div className="room-price">

                          <strong>
                            NPR{" "}
                            {Number(
                              room.price || 0
                            ).toLocaleString("en-NP")}
                          </strong>

                          <span>
                            per night
                          </span>

                        </div>

                      </div>

                      {/* DESTINATION */}

                      {room.destination && (
                        <div className="room-destination">
                          📍 {room.destination}
                        </div>
                      )}

                      {/* DESCRIPTION */}

                      <p className="room-description">
                        {room.description}
                      </p>

                      {/* ==================================
                          ROOM INFORMATION
                      ================================== */}

                      <div className="room-info">

                        <span className="info-item">
                          👥 {room.capacity || 0} Guests
                        </span>

                        {room.beds && (
                          <span className="info-item">
                            🛏 {room.beds}
                          </span>
                        )}

                      </div>

                      {/* ==================================
                          AMENITIES
                      ================================== */}

                      {hasAmenities && (
                        <div className="amenities">

                          {room.amenities.map(
                            (amenity, index) => (
                              <span
                                className="amenity"
                                key={
                                  room._id +
                                  "-" +
                                  index
                                }
                              >
                                {amenity}
                              </span>
                            )
                          )}

                        </div>
                      )}

                      {/* ==================================
                          ACTIONS
                      ================================== */}

                      <div className="room-actions">

                        <Link
                          to={
                            "/rooms/" +
                            room._id
                          }
                          className="room-btn details-btn"
                        >
                          View Details
                        </Link>

                        {room.available ? (
                          <Link
                            to={
                              "/booking?room=" +
                              room._id
                            }
                            className="room-btn book-btn"
                          >
                            Book Now
                          </Link>
                        ) : (
                          <span
                            className="room-btn book-btn disabled"
                          >
                            Unavailable
                          </span>
                        )}

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          ) : (

            /* ==========================================
               NO RESULTS
            ========================================== */

            <div className="no-results">

              <div className="no-results-icon">
                ⌕
              </div>

              <h2>
                No rooms found
              </h2>

              <p>
                We couldn't find a room matching your
                current search. Try another destination,
                fewer guests, or different dates.
              </p>

              {isSearchResult && (
                <button
                  type="button"
                  onClick={clearSearch}
                >
                  Explore All Rooms
                </button>
              )}

            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Rooms;