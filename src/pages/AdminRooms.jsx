import { useEffect, useState } from "react";
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from "../services/roomApi";

const emptyForm = {
  name: "",
  destination: "",
  description: "",
  price: "",
  capacity: "",
  beds: "",
  amenities: "",
  images: "",
  available: true,
};

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [roomsLoading, setRoomsLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD ROOMS
  // =====================================================

  const loadRooms = async () => {
    try {
      setRoomsLoading(true);
      setError("");

      const result = await getRooms();

      setRooms(
        Array.isArray(result?.data)
          ? result.data
          : []
      );
    } catch (err) {
      console.error("Load rooms error:", err);
      setError(
        "Unable to load rooms. Please check your backend."
      );
    } finally {
      setRoomsLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  // =====================================================
  // SUBMIT ROOM
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Convert amenities text to array
      const amenitiesArray = form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      // Convert image URLs to array
      const imagesArray = form.images
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const roomData = {
        name: form.name.trim(),

        destination:
          form.destination.trim(),

        description:
          form.description.trim(),

        price: Number(form.price),

        capacity: Number(form.capacity),

        beds: form.beds.trim(),

        amenities: amenitiesArray,

        images: imagesArray,

        available: form.available,
      };

      // ================================================
      // UPDATE
      // ================================================

      if (editingId) {
        const result = await updateRoom(
          editingId,
          roomData
        );

        if (result?.success === false) {
          throw new Error(
            result.message ||
              "Failed to update room"
          );
        }

        setSuccess(
          "Room updated successfully."
        );
      }

      // ================================================
      // CREATE
      // ================================================

      else {
        const result = await createRoom(
          roomData
        );

        if (result?.success === false) {
          throw new Error(
            result.message ||
              "Failed to create room"
          );
        }

        setSuccess(
          "Room added successfully."
        );
      }

      resetForm();

      await loadRooms();
    } catch (err) {
      console.error(
        "Save room error:",
        err
      );

      setError(
        err.message ||
          "Unable to save room."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EDIT ROOM
  // =====================================================

  const handleEdit = (room) => {
    setEditingId(room._id);

    setForm({
      name: room.name || "",

      destination:
        room.destination || "",

      description:
        room.description || "",

      price:
        room.price ?? "",

      capacity:
        room.capacity ?? "",

      beds:
        room.beds || "",

      amenities:
        Array.isArray(room.amenities)
          ? room.amenities.join(", ")
          : "",

      images:
        Array.isArray(room.images)
          ? room.images.join("\n")
          : "",

      available:
        room.available !== false,
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE ROOM
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteRoom(id);

      setSuccess(
        "Room deleted successfully."
      );

      await loadRooms();
    } catch (err) {
      console.error(
        "Delete room error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete room."
      );
    }
  };

  // =====================================================
  // STYLES
  // =====================================================

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        .admin-page {
          min-height: 100vh;
          background: #f5f7f4;
          padding: 60px 5%;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
          color: #18231d;
        }

        .admin-container {
          max-width: 1250px;
          margin: 0 auto;
        }

        /* =========================================
           HEADER
        ========================================= */

        .admin-header {
          margin-bottom: 35px;
        }

        .admin-label {
          display: inline-block;
          margin-bottom: 10px;
          color: #8b6b3f;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .admin-header h1 {
          margin: 0 0 12px;
          font-size: clamp(
            34px,
            5vw,
            55px
          );
          line-height: 1.05;
        }

        .admin-header p {
          margin: 0;
          max-width: 700px;
          color: #68716b;
          font-size: 15px;
          line-height: 1.7;
        }

        /* =========================================
           ALERTS
        ========================================= */

        .alert {
          padding: 14px 18px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .alert-success {
          background: #e8f4ec;
          color: #28613b;
          border: 1px solid #cce4d3;
        }

        .alert-error {
          background: #faeaea;
          color: #963939;
          border: 1px solid #edcccc;
        }

        /* =========================================
           FORM CARD
        ========================================= */

        .room-form-card {
          background: white;
          border: 1px solid #e1e6e1;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 50px;
          box-shadow:
            0 12px 35px
            rgba(24, 35, 29, 0.06);
        }

        .form-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }

        .form-heading h2 {
          margin: 0;
          font-size: 25px;
        }

        .editing-badge {
          padding: 8px 13px;
          border-radius: 30px;
          background: #f3eee6;
          color: #8b6b3f;
          font-size: 12px;
          font-weight: 700;
        }

        .form-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-group label {
          margin-bottom: 8px;
          color: #354139;
          font-size: 13px;
          font-weight: 700;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          border: 1px solid #dce2dc;
          border-radius: 10px;
          padding: 13px 14px;
          outline: none;
          background: #fbfcfb;
          color: #18231d;
          font-size: 14px;
          font-family: inherit;
          transition: 0.2s ease;
        }

        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #8b6b3f;
          background: white;
          box-shadow:
            0 0 0 3px
            rgba(139, 107, 63, 0.08);
        }

        .field-help {
          margin-top: 6px;
          color: #8b918d;
          font-size: 11px;
          line-height: 1.5;
        }

        /* =========================================
           AVAILABLE
        ========================================= */

        .availability-toggle {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 46px;
          padding: 10px 14px;
          border: 1px solid #dce2dc;
          border-radius: 10px;
          background: #fbfcfb;
        }

        .availability-toggle input {
          width: 18px;
          height: 18px;
          accent-color: #28613b;
        }

        .availability-toggle span {
          color: #354139;
          font-size: 13px;
          font-weight: 600;
        }

        /* =========================================
           FORM ACTIONS
        ========================================= */

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }

        .primary-btn,
        .secondary-btn {
          border: 0;
          border-radius: 10px;
          padding: 14px 22px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .primary-btn {
          background: #18231d;
          color: white;
        }

        .primary-btn:hover {
          background: #8b6b3f;
          transform: translateY(-2px);
        }

        .primary-btn:disabled {
          background: #9da39f;
          cursor: not-allowed;
          transform: none;
        }

        .secondary-btn {
          background: #f0f2ef;
          color: #354139;
        }

        .secondary-btn:hover {
          background: #e3e7e3;
        }

        /* =========================================
           ROOM LIST
        ========================================= */

        .rooms-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .rooms-heading h2 {
          margin: 0 0 5px;
          font-size: 28px;
        }

        .rooms-heading p {
          margin: 0;
          color: #68716b;
          font-size: 13px;
        }

        .rooms-count {
          padding: 9px 13px;
          border-radius: 30px;
          background: white;
          border: 1px solid #dfe4df;
          color: #46524a;
          font-size: 12px;
          font-weight: 700;
        }

        .admin-rooms-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        .admin-room-card {
          overflow: hidden;
          background: white;
          border: 1px solid #e1e6e1;
          border-radius: 18px;
          box-shadow:
            0 10px 30px
            rgba(24, 35, 29, 0.05);
        }

        .admin-room-image {
          height: 190px;
          background: #dfe5df;
          position: relative;
        }

        .admin-room-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #68716b;
          font-size: 13px;
          font-weight: 600;
        }

        .status-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 7px 11px;
          border-radius: 30px;
          background: rgba(
            255,
            255,
            255,
            0.94
          );
          color: #28613b;
          font-size: 11px;
          font-weight: 700;
        }

        .status-badge.unavailable {
          color: #963939;
        }

        .admin-room-content {
          padding: 20px;
        }

        .admin-room-title-row {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          align-items: start;
          margin-bottom: 8px;
        }

        .admin-room-title {
          margin: 0;
          font-size: 19px;
          line-height: 1.3;
        }

        .admin-room-price {
          flex-shrink: 0;
          color: #8b6b3f;
          font-size: 15px;
          font-weight: 700;
        }

        .admin-room-destination {
          margin: 0 0 12px;
          color: #8b6b3f;
          font-size: 12px;
          font-weight: 700;
        }

        .admin-room-description {
          margin: 0 0 15px;
          color: #68716b;
          font-size: 13px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .admin-room-info {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 15px;
        }

        .admin-info-item {
          padding: 7px 9px;
          border-radius: 7px;
          background: #f3f5f2;
          color: #4d5751;
          font-size: 11px;
          font-weight: 600;
        }

        .admin-amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }

        .admin-amenity {
          color: #68716b;
          font-size: 11px;
        }

        .admin-amenity:not(:last-child)::after {
          content: "•";
          margin-left: 6px;
          color: #adb3ae;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          padding-top: 16px;
          border-top: 1px solid #eceeeb;
        }

        .edit-btn,
        .delete-btn {
          flex: 1;
          border-radius: 9px;
          padding: 11px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .edit-btn {
          border: 1px solid #d7ddd7;
          background: white;
          color: #354139;
        }

        .edit-btn:hover {
          background: #f2f4f1;
        }

        .delete-btn {
          border: 1px solid #e6cccc;
          background: #fff8f8;
          color: #963939;
        }

        .delete-btn:hover {
          background: #963939;
          color: white;
        }

        /* =========================================
           EMPTY / LOADING
        ========================================= */

        .rooms-empty {
          padding: 60px 20px;
          text-align: center;
          background: white;
          border: 1px solid #e1e6e1;
          border-radius: 18px;
        }

        .rooms-empty h3 {
          margin: 0 0 8px;
          font-size: 22px;
        }

        .rooms-empty p {
          margin: 0;
          color: #68716b;
          font-size: 14px;
        }

        .rooms-loading {
          padding: 60px;
          text-align: center;
          color: #68716b;
          background: white;
          border-radius: 18px;
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 1000px) {

          .admin-rooms-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

        }

        @media (max-width: 700px) {

          .admin-page {
            padding: 40px 18px;
          }

          .room-form-card {
            padding: 22px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: auto;
          }

          .admin-rooms-grid {
            grid-template-columns: 1fr;
          }

          .form-heading,
          .rooms-heading {
            flex-direction: column;
            align-items: flex-start;
          }

          .form-actions {
            flex-direction: column;
          }

          .primary-btn,
          .secondary-btn {
            width: 100%;
          }

        }

      `}</style>

      <main className="admin-page">
        <div className="admin-container">

          {/* =========================================
              HEADER
          ========================================= */}

          <header className="admin-header">
            <span className="admin-label">
              Room Management
            </span>

            <h1>
              Manage Your Rooms
            </h1>

            <p>
              Add new rooms, update room
              information, manage availability
              and remove rooms directly from
              your hotel system.
            </p>
          </header>

          {/* =========================================
              ALERTS
          ========================================= */}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {/* =========================================
              ADD / EDIT FORM
          ========================================= */}

          <section className="room-form-card">

            <div className="form-heading">

              <h2>
                {editingId
                  ? "Edit Room"
                  : "Add New Room"}
              </h2>

              {editingId && (
                <span className="editing-badge">
                  Editing Room
                </span>
              )}

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                {/* ROOM NAME */}

                <div className="form-group">
                  <label>
                    Room Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Deluxe Mountain View Room"
                    required
                  />
                </div>

                {/* DESTINATION */}

                <div className="form-group">
                  <label>
                    Destination *
                  </label>

                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="Kathmandu"
                    required
                  />
                </div>

                {/* PRICE */}

                <div className="form-group">
                  <label>
                    Price Per Night (NPR) *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="4000"
                    min="0"
                    required
                  />
                </div>

                {/* CAPACITY */}

                <div className="form-group">
                  <label>
                    Guest Capacity *
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    placeholder="3"
                    min="1"
                    required
                  />
                </div>

                {/* BEDS */}

                <div className="form-group">
                  <label>
                    Beds *
                  </label>

                  <input
                    type="text"
                    name="beds"
                    value={form.beds}
                    onChange={handleChange}
                    placeholder="1 Double Bed"
                    required
                  />
                </div>

                {/* AVAILABLE */}

                <div className="form-group">

                  <label>
                    Availability
                  </label>

                  <label className="availability-toggle">

                    <input
                      type="checkbox"
                      name="available"
                      checked={form.available}
                      onChange={handleChange}
                    />

                    <span>
                      Room is available
                    </span>

                  </label>

                </div>

                {/* DESCRIPTION */}

                <div className="form-group full">

                  <label>
                    Room Description *
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Comfortable room with beautiful Himalayan mountain views."
                    required
                  />

                </div>

                {/* AMENITIES */}

                <div className="form-group full">

                  <label>
                    Amenities
                  </label>

                  <input
                    type="text"
                    name="amenities"
                    value={form.amenities}
                    onChange={handleChange}
                    placeholder="WiFi, Hot Shower, TV, Mountain View"
                  />

                  <span className="field-help">
                    Separate amenities with commas.
                  </span>

                </div>

                {/* IMAGES */}

                <div className="form-group full">

                  <label>
                    Image URLs
                  </label>

                  <textarea
                    name="images"
                    value={form.images}
                    onChange={handleChange}
                    placeholder={
                      "https://example.com/room-1.jpg\nhttps://example.com/room-2.jpg"
                    }
                  />

                  <span className="field-help">
                    Put one image URL on each line.
                  </span>

                </div>

              </div>

              {/* FORM BUTTONS */}

              <div className="form-actions">

                <button
                  type="submit"
                  className="primary-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : editingId
                    ? "Update Room"
                    : "Add Room"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                )}

              </div>

            </form>

          </section>

          {/* =========================================
              EXISTING ROOMS
          ========================================= */}

          <section>

            <div className="rooms-heading">

              <div>
                <h2>
                  Existing Rooms
                </h2>

                <p>
                  Manage rooms currently stored
                  in your database.
                </p>
              </div>

              <span className="rooms-count">
                {rooms.length}{" "}
                {rooms.length === 1
                  ? "Room"
                  : "Rooms"}
              </span>

            </div>

            {roomsLoading ? (
              <div className="rooms-loading">
                Loading rooms...
              </div>
            ) : rooms.length === 0 ? (
              <div className="rooms-empty">

                <h3>
                  No rooms added yet
                </h3>

                <p>
                  Add your first room using
                  the form above.
                </p>

              </div>
            ) : (
              <div className="admin-rooms-grid">

                {rooms.map((room) => (

                  <article
                    className="admin-room-card"
                    key={room._id}
                  >

                    {/* IMAGE */}

                    <div className="admin-room-image">

                      {Array.isArray(
                        room.images
                      ) &&
                      room.images.length > 0 ? (

                        <img
                          src={room.images[0]}
                          alt={room.name}
                          loading="lazy"
                        />

                      ) : (

                        <div className="no-image">
                          No Room Image
                        </div>

                      )}

                      <span
                        className={
                          "status-badge " +
                          (!room.available
                            ? "unavailable"
                            : "")
                        }
                      >
                        {room.available
                          ? "● Available"
                          : "● Unavailable"}
                      </span>

                    </div>

                    {/* CONTENT */}

                    <div className="admin-room-content">

                      <div className="admin-room-title-row">

                        <h3 className="admin-room-title">
                          {room.name}
                        </h3>

                        <span className="admin-room-price">
                          NPR{" "}
                          {Number(
                            room.price || 0
                          ).toLocaleString(
                            "en-NP"
                          )}
                        </span>

                      </div>

                      <p className="admin-room-destination">
                        {room.destination}
                      </p>

                      <p className="admin-room-description">
                        {room.description}
                      </p>

                      <div className="admin-room-info">

                        <span className="admin-info-item">
                          {room.capacity} Guests
                        </span>

                        <span className="admin-info-item">
                          {room.beds}
                        </span>

                      </div>

                      {Array.isArray(
                        room.amenities
                      ) &&
                      room.amenities.length > 0 && (

                        <div className="admin-amenities">

                          {room.amenities
                            .slice(0, 5)
                            .map(
                              (
                                amenity,
                                index
                              ) => (

                                <span
                                  className="admin-amenity"
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

                      {/* ACTIONS */}

                      <div className="card-actions">

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(room)
                          }
                        >
                          Edit Room
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              room._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>
            )}

          </section>

        </div>
      </main>
    </>
  );
};

export default AdminRooms;