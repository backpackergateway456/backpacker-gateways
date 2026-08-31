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

// =====================================================
// HOTEL / LODGE QUICK DATA
// =====================================================

const hotelPresets = [
  {
    name: "Phakding Camp One Lodge",
    destination: "Phakding, Everest Region, Nepal",
    description:
      "Comfortable lodge accommodation in Phakding, ideal for trekkers beginning their Everest Base Camp journey. Breakfast is included. Free cancellation is available according to the booking policy. Already booked? Secure your upcoming trip in advance.",
    price: 3526,
    capacity: 2,
    beds: "1 Double Bed / Twin Beds",
    amenities:
      "Breakfast Included, Free Cancellation, Everest Region, Hot Shower, WiFi, Trekking Lodge",
    images:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
  },

  {
    name: "Sangrila Guest House Lodge",
    destination: "Phakding, Everest Region, Nepal",
    description:
      "Budget-friendly lodge accommodation located approximately 300 meters from the centre of Phakding. Price shown per person. A convenient stay for trekkers travelling through the Everest region.",
    price: 825,
    capacity: 2,
    beds: "Twin Beds",
    amenities:
      "Price Per Person, 300 m from Centre, Breakfast Available, Free Cancellation, Hot Shower, Everest Region",
    images:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
  },

  {
    name: "Tribeni Lodge Phakding",
    destination: "Phakding, Everest Region, Nepal",
    description:
      "A convenient trekking lodge in Phakding, approximately 1,526 meters above sea level. Free cancellation is available, with prepayment required for advance bookings.",
    price: 1526,
    capacity: 2,
    beds: "Twin Beds",
    amenities:
      "Free Cancellation, Prepayment Required for Advance Booking, Everest Region, Hot Shower, Restaurant",
    images:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85",
  },

  {
    name: "Hotel Waterfall Benker",
    destination: "Everest Region, Nepal",
    description:
      "Comfortable accommodation for trekkers exploring the Everest region. Free cancellation is available, while prepayment is required for advance bookings.",
    price: 1526,
    capacity: 2,
    beds: "Twin Beds",
    amenities:
      "Free Cancellation, Prepayment Required for Advance Booking, Everest Region, Restaurant, Hot Shower",
    images:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
  },

  {
    name: "Buddha Lodges & Restaurants",
    destination: "Monjo, Everest Region, Nepal",
    description:
      "Affordable lodge accommodation in Monjo on the Everest trekking route. Price shown per person. No prepayment is required, making it convenient for trekkers.",
    price: 518,
    capacity: 2,
    beds: "Twin Beds",
    amenities:
      "Price Per Person, No Prepayment Required, Everest Region, Restaurant, Hot Shower, Trekking Lodge",
    images:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
  },

  {
    name: "Yak & Yeti",
    destination: "Kathmandu, Nepal",
    description:
      "Premium luxury hotel accommodation in Kathmandu. A refined choice for travellers looking for a high-end stay before or after their Himalayan adventure.",
    price: 11226,
    capacity: 2,
    beds: "1 King Bed",
    amenities:
      "Luxury Hotel, Breakfast Available, Swimming Pool, Restaurant, WiFi, Premium Stay",
    images:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
  },

  {
    name: "Aloft Kathmandu Thamel",
    destination: "Kathmandu, Nepal",
    description:
      "Modern premium hotel accommodation in Kathmandu. Standard rate is NPR 6,419 per night, currently offered at a reduced rate of NPR 5,214 per night.",
    price: 5214,
    capacity: 2,
    beds: "1 King Bed",
    amenities:
      "Special Rate, Original Price NPR 6,419, Breakfast Available, Free WiFi, Modern Hotel, Thamel",
    images:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
];

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [roomsLoading, setRoomsLoading] = useState(true);

  const [quickAdding, setQuickAdding] = useState(false);

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
        "Unable to load hotels. Please check your backend."
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
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

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
  // LOAD PRESET INTO FORM
  // =====================================================

  const useHotelPreset = (hotel) => {
    setEditingId(null);

    setForm({
      name: hotel.name,
      destination: hotel.destination,
      description: hotel.description,
      price: hotel.price,
      capacity: hotel.capacity,
      beds: hotel.beds,
      amenities: hotel.amenities,
      images: hotel.images,
      available: true,
    });

    setError("");

    setSuccess(
      `${hotel.name} is ready to add. Review the details and click Add Hotel.`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // SUBMIT HOTEL
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const amenitiesArray = form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

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

      // =================================================
      // UPDATE
      // =================================================

      if (editingId) {
        const result = await updateRoom(
          editingId,
          roomData
        );

        if (result?.success === false) {
          throw new Error(
            result.message ||
              "Failed to update hotel"
          );
        }

        setSuccess(
          "Hotel updated successfully."
        );
      }

      // =================================================
      // CREATE
      // =================================================

      else {
        const result = await createRoom(
          roomData
        );

        if (result?.success === false) {
          throw new Error(
            result.message ||
              "Failed to add hotel"
          );
        }

        setSuccess(
          "Hotel added successfully."
        );
      }

      resetForm();

      await loadRooms();
    } catch (err) {
      console.error(
        "Save hotel error:",
        err
      );

      setError(
        err.message ||
          "Unable to save hotel."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // QUICK ADD ALL HOTELS
  // =====================================================

  const addAllHotels = async () => {
    const confirmed = window.confirm(
      "Do you want to add all 7 hotels/lodges to your database?"
    );

    if (!confirmed) return;

    try {
      setQuickAdding(true);
      setError("");
      setSuccess("");

      let added = 0;

      for (const hotel of hotelPresets) {
        const roomData = {
          name: hotel.name,
          destination: hotel.destination,
          description: hotel.description,
          price: Number(hotel.price),
          capacity: Number(hotel.capacity),
          beds: hotel.beds,

          amenities: hotel.amenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

          images: hotel.images
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

          available: true,
        };

        await createRoom(roomData);

        added++;
      }

      setSuccess(
        `${added} hotels/lodges added successfully.`
      );

      await loadRooms();
    } catch (err) {
      console.error(
        "Quick add hotels error:",
        err
      );

      setError(
        err.message ||
          "Some hotels could not be added."
      );

      await loadRooms();
    } finally {
      setQuickAdding(false);
    }
  };

  // =====================================================
  // EDIT HOTEL
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
  // DELETE HOTEL
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteRoom(id);

      setSuccess(
        "Hotel deleted successfully."
      );

      await loadRooms();
    } catch (err) {
      console.error(
        "Delete hotel error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete hotel."
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
          max-width: 1350px;
          margin: 0 auto;
        }

        /* =========================================
           HEADER
        ========================================= */

        .admin-header {
          margin-bottom: 30px;
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
          font-size: clamp(34px, 5vw, 55px);
          line-height: 1.05;
        }

        .admin-header p {
          margin: 0;
          max-width: 760px;
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
           QUICK HOTEL SECTION
        ========================================= */

        .quick-section {
          margin-bottom: 45px;
        }

        .quick-header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          margin-bottom: 20px;
        }

        .quick-header h2 {
          margin: 0 0 5px;
          font-size: 27px;
        }

        .quick-header p {
          margin: 0;
          color: #68716b;
          font-size: 13px;
        }

        .quick-add-all {
          border: 0;
          border-radius: 10px;
          background: #18231d;
          color: white;
          padding: 13px 18px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: .25s ease;
        }

        .quick-add-all:hover {
          background: #8b6b3f;
          transform: translateY(-2px);
        }

        .quick-add-all:disabled {
          opacity: .6;
          cursor: not-allowed;
          transform: none;
        }

        .preset-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .preset-card {
          overflow: hidden;
          background: white;
          border: 1px solid #e1e6e1;
          border-radius: 15px;
          box-shadow:
            0 8px 25px
            rgba(24, 35, 29, .04);
        }

        .preset-image {
          height: 150px;
          position: relative;
          background: #dfe5df;
        }

        .preset-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .preset-content {
          padding: 15px;
        }

        .preset-content h3 {
          margin: 0 0 5px;
          font-size: 16px;
          line-height: 1.3;
        }

        .preset-location {
          margin: 0 0 10px;
          color: #8b6b3f;
          font-size: 11px;
          font-weight: 700;
        }

        .preset-price {
          margin-bottom: 12px;
          font-size: 15px;
          font-weight: 800;
          color: #18231d;
        }

        .preset-price small {
          color: #7a817c;
          font-size: 10px;
          font-weight: 500;
        }

        .preset-button {
          width: 100%;
          border: 1px solid #d7ddd7;
          border-radius: 8px;
          background: white;
          color: #354139;
          padding: 10px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .preset-button:hover {
          background: #18231d;
          color: white;
          border-color: #18231d;
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
            rgba(24, 35, 29, .06);
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
          transition: .2s ease;
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
            rgba(139, 107, 63, .08);
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
          transition: .25s ease;
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
            rgba(24, 35, 29, .05);
        }

        .admin-room-image {
          height: 200px;
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
          background: rgba(255,255,255,.94);
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
          -webkit-line-clamp: 4;
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
          transition: .2s ease;
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

        @media (max-width: 1150px) {

          .preset-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .admin-rooms-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

        }

        @media (max-width: 800px) {

          .preset-grid {
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

          .admin-rooms-grid,
          .preset-grid {
            grid-template-columns: 1fr;
          }

          .form-heading,
          .rooms-heading,
          .quick-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .form-actions {
            flex-direction: column;
          }

          .primary-btn,
          .secondary-btn,
          .quick-add-all {
            width: 100%;
          }

        }

      `}</style>

      <main className="admin-page">

        <div className="admin-container">

          {/* =================================================
              HEADER
          ================================================= */}

          <header className="admin-header">

            <span className="admin-label">
              Hotel & Lodge Management
            </span>

            <h1>
              Manage Hotels & Rooms
            </h1>

            <p>
              Add Everest Region lodges,
              Kathmandu luxury hotels,
              room prices, cancellation policies,
              booking information and hotel images.
            </p>

          </header>

          {/* =================================================
              ALERTS
          ================================================= */}

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

          {/* =================================================
              QUICK HOTEL LIST
          ================================================= */}

          <section className="quick-section">

            <div className="quick-header">

              <div>

                <h2>
                  Recommended Hotels & Lodges
                </h2>

                <p>
                  Select a hotel to automatically
                  fill the hotel form.
                </p>

              </div>

              <button
                type="button"
                className="quick-add-all"
                onClick={addAllHotels}
                disabled={quickAdding}
              >
                {quickAdding
                  ? "Adding Hotels..."
                  : "Add All 7 Hotels"}
              </button>

            </div>

            <div className="preset-grid">

              {hotelPresets.map(
                (hotel, index) => (

                  <article
                    className="preset-card"
                    key={hotel.name}
                  >

                    <div className="preset-image">

                      <img
                        src={hotel.images}
                        alt={hotel.name}
                        loading="lazy"
                      />

                    </div>

                    <div className="preset-content">

                      <h3>
                        {hotel.name}
                      </h3>

                      <p className="preset-location">
                        {hotel.destination}
                      </p>

                      <div className="preset-price">

                        NPR{" "}
                        {Number(
                          hotel.price
                        ).toLocaleString("en-NP")}

                        <small>
                          {hotel.name
                            .toLowerCase()
                            .includes("buddha") ||
                          hotel.name
                            .toLowerCase()
                            .includes("sangrila")
                            ? " / person"
                            : " / night"}
                        </small>

                      </div>

                      <button
                        type="button"
                        className="preset-button"
                        onClick={() =>
                          useHotelPreset(
                            hotel
                          )
                        }
                      >
                        Use This Hotel
                      </button>

                    </div>

                  </article>

                )
              )}

            </div>

          </section>

          {/* =================================================
              ADD / EDIT FORM
          ================================================= */}

          <section className="room-form-card">

            <div className="form-heading">

              <h2>
                {editingId
                  ? "Edit Hotel"
                  : "Add New Hotel"}
              </h2>

              {editingId && (
                <span className="editing-badge">
                  Editing Hotel
                </span>
              )}

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                {/* HOTEL NAME */}

                <div className="form-group">

                  <label>
                    Hotel / Lodge Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Phakding Camp One Lodge"
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
                    placeholder="Phakding, Everest Region, Nepal"
                    required
                  />

                </div>

                {/* PRICE */}

                <div className="form-group">

                  <label>
                    Price *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="3526"
                    min="0"
                    required
                  />

                  <span className="field-help">
                    Enter the main price. Mention
                    "per person" or "per night"
                    in amenities/description.
                  </span>

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
                    placeholder="2"
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
                    placeholder="1 Double Bed / Twin Beds"
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
                      checked={
                        form.available
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <span>
                      Hotel / Room is available
                    </span>

                  </label>

                </div>

                {/* DESCRIPTION */}

                <div className="form-group full">

                  <label>
                    Hotel Description *
                  </label>

                  <textarea
                    name="description"
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Comfortable lodge in Phakding with breakfast included and free cancellation."
                    required
                  />

                </div>

                {/* AMENITIES */}

                <div className="form-group full">

                  <label>
                    Hotel Features / Policies
                  </label>

                  <input
                    type="text"
                    name="amenities"
                    value={
                      form.amenities
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Breakfast Included, Free Cancellation, WiFi, Hot Shower"
                  />

                  <span className="field-help">
                    Separate each item with commas.
                    Example: Free Cancellation,
                    Breakfast Included, Prepayment Required.
                  </span>

                </div>

                {/* IMAGES */}

                <div className="form-group full">

                  <label>
                    Hotel Image URLs
                  </label>

                  <textarea
                    name="images"
                    value={form.images}
                    onChange={handleChange}
                    placeholder={
                      "https://example.com/hotel-1.jpg\nhttps://example.com/hotel-2.jpg"
                    }
                  />

                  <span className="field-help">
                    Put one image URL on each line.
                  </span>

                </div>

              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="form-actions">

                <button
                  type="submit"
                  className="primary-btn"
                  disabled={loading}
                >

                  {loading
                    ? "Saving..."
                    : editingId
                    ? "Update Hotel"
                    : "Add Hotel"}

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

          {/* =================================================
              EXISTING HOTELS
          ================================================= */}

          <section>

            <div className="rooms-heading">

              <div>

                <h2>
                  Existing Hotels & Lodges
                </h2>

                <p>
                  Manage hotels and lodges currently
                  stored in your database.
                </p>

              </div>

              <span className="rooms-count">

                {rooms.length}{" "}

                {rooms.length === 1
                  ? "Hotel"
                  : "Hotels"}

              </span>

            </div>

            {roomsLoading ? (

              <div className="rooms-loading">
                Loading hotels...
              </div>

            ) : rooms.length === 0 ? (

              <div className="rooms-empty">

                <h3>
                  No hotels added yet
                </h3>

                <p>
                  Select a hotel above or
                  use the form to add one.
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
                          src={
                            room.images[0]
                          }
                          alt={
                            room.name
                          }
                          loading="lazy"
                        />

                      ) : (

                        <div className="no-image">
                          No Hotel Image
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
                            .slice(0, 6)
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
                            handleEdit(
                              room
                            )
                          }
                        >
                          Edit Hotel
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