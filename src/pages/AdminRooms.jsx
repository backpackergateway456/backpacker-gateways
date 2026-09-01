import { useEffect, useState } from "react";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../services/roomApi";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    destination: "",
    description: "",
    price: "",
    capacity: "",
    beds: "",
    amenities: "",
    images: "",
    available: true,
  });

  const [editingId, setEditingId] = useState(null);

  const loadRooms = async () => {
    try {
      setLoading(true);

      const result = await getRooms();

      if (Array.isArray(result?.data)) {
        setRooms(result.data);
      } else if (Array.isArray(result)) {
        setRooms(result);
      } else {
        setRooms([]);
      }
    } catch (error) {
      console.error("ADMIN ROOM ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      destination: "",
      description: "",
      price: "",
      capacity: "",
      beds: "",
      amenities: "",
      images: "",
      available: true,
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const roomData = {
        name: form.name,
        destination: form.destination,
        description: form.description,
        price: Number(form.price),
        capacity: Number(form.capacity),
        beds: form.beds,
        amenities: form.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        images: form.images
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        available: form.available,
      };

      if (editingId) {
        await updateRoom(editingId, roomData);
        alert("Room updated successfully");
      } else {
        await createRoom(roomData);
        alert("Room added successfully");
      }

      resetForm();
      await loadRooms();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleEdit = (room) => {
    setEditingId(room._id);

    setForm({
      name: room.name || "",
      destination: room.destination || "",
      description: room.description || "",
      price: room.price || "",
      capacity: room.capacity || "",
      beds: room.beds || "",
      amenities: room.amenities?.join(", ") || "",
      images: room.images?.join(", ") || "",
      available: room.available ?? true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      await deleteRoom(id);

      alert("Room deleted successfully");

      await loadRooms();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-container">

        <div className="admin-header">
          <div>
            <span>BACKPACKER GATEWAYS</span>
            <h1>Room Management</h1>
            <p>
              Add, edit and manage hotel rooms and mountain lodges.
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={loadRooms}
          >
            Refresh Rooms
          </button>
        </div>

        <div className="admin-card">

          <h2>
            {editingId ? "Edit Room" : "Add New Room"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="field">
                <label>Room / Hotel Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Everest View Mountain Lodge"
                  required
                />
              </div>

              <div className="field">
                <label>Destination</label>
                <input
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Khumjung, Everest Region"
                  required
                />
              </div>

              <div className="field">
                <label>Price Per Night (NPR)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="3200"
                  required
                />
              </div>

              <div className="field">
                <label>Guest Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="2"
                  required
                />
              </div>

              <div className="field">
                <label>Beds</label>
                <input
                  name="beds"
                  value={form.beds}
                  onChange={handleChange}
                  placeholder="1 Double Bed"
                />
              </div>

              <div className="field">
                <label>Image URL</label>
                <input
                  name="images"
                  value={form.images}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="field full">
                <label>Description</label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the hotel or room..."
                  rows="5"
                  required
                />
              </div>

              <div className="field full">
                <label>Amenities</label>

                <input
                  name="amenities"
                  value={form.amenities}
                  onChange={handleChange}
                  placeholder="Mountain View, WiFi, Restaurant, Hot Shower"
                />

                <small>
                  Separate amenities using commas.
                </small>
              </div>

              <div className="available-field">

                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={form.available}
                    onChange={handleChange}
                  />

                  Room Available
                </label>

              </div>

            </div>

            <div className="form-buttons">

              <button
                type="submit"
                className="save-btn"
              >
                {editingId ? "Update Room" : "Add Room"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>

        </div>

        <div className="rooms-admin-section">

          <div className="rooms-title">
            <h2>Existing Rooms</h2>
            <span>{rooms.length} rooms</span>
          </div>

          {loading ? (
            <div className="loading">
              Loading rooms...
            </div>
          ) : rooms.length === 0 ? (
            <div className="empty">
              No rooms found.
            </div>
          ) : (
            <div className="admin-rooms-grid">

              {rooms.map((room) => (

                <div
                  className="admin-room-card"
                  key={room._id}
                >

                  <img
                    src={
                      room.images?.[0] ||
                      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={room.name}
                  />

                  <div className="admin-room-content">

                    <h3>{room.name}</h3>

                    <p className="destination">
                      {room.destination}
                    </p>

                    <p>
                      {room.description}
                    </p>

                    <div className="room-meta">
                      <strong>
                        NPR {Number(room.price || 0).toLocaleString("en-NP")}
                      </strong>

                      <span>
                        {room.capacity} Guests
                      </span>
                    </div>

                    <div className="admin-actions">

                      <button
                        onClick={() => handleEdit(room)}
                        className="edit-btn"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(room._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .admin-page {
          min-height: 100vh;
          background: #f5f7f4;
          padding: 50px 20px;
          color: #18231d;
          font-family: Arial, Helvetica, sans-serif;
        }

        .admin-container {
          max-width: 1250px;
          margin: auto;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 35px;
        }

        .admin-header span {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 3px;
          color: #8b6b3f;
        }

        .admin-header h1 {
          margin: 8px 0;
          font-size: 42px;
        }

        .admin-header p {
          margin: 0;
          color: #68716b;
        }

        .refresh-btn {
          border: 0;
          background: #18231d;
          color: white;
          padding: 13px 20px;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 700;
        }

        .admin-card {
          background: white;
          border: 1px solid #e1e6e1;
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 45px;
          box-shadow: 0 10px 30px rgba(24,35,29,.06);
        }

        .admin-card h2 {
          margin-top: 0;
          margin-bottom: 25px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        .field label {
          font-size: 13px;
          font-weight: 800;
        }

        .field input,
        .field textarea {
          width: 100%;
          border: 1px solid #d8ded8;
          border-radius: 9px;
          padding: 13px;
          font-size: 14px;
          outline: none;
          font-family: inherit;
        }

        .field input:focus,
        .field textarea:focus {
          border-color: #8b6b3f;
        }

        .field small {
          color: #777;
        }

        .available-field {
          grid-column: 1 / -1;
        }

        .available-field label {
          display: flex;
          gap: 10px;
          align-items: center;
          font-weight: 700;
        }

        .form-buttons {
          display: flex;
          gap: 10px;
          margin-top: 25px;
        }

        .save-btn,
        .cancel-btn {
          padding: 13px 24px;
          border-radius: 9px;
          border: 0;
          cursor: pointer;
          font-weight: 800;
        }

        .save-btn {
          background: #18231d;
          color: white;
        }

        .cancel-btn {
          background: #e8ece8;
          color: #18231d;
        }

        .rooms-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .rooms-title h2 {
          margin: 0;
          font-size: 28px;
        }

        .rooms-title span {
          color: #68716b;
          font-size: 14px;
        }

        .admin-rooms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .admin-room-card {
          overflow: hidden;
          background: white;
          border: 1px solid #e1e6e1;
          border-radius: 18px;
        }

        .admin-room-card img {
          width: 100%;
          height: 210px;
          object-fit: cover;
          display: block;
        }

        .admin-room-content {
          padding: 20px;
        }

        .admin-room-content h3 {
          margin: 0 0 7px;
          font-size: 20px;
        }

        .admin-room-content p {
          color: #68716b;
          font-size: 13px;
          line-height: 1.5;
        }

        .admin-room-content .destination {
          color: #8b6b3f;
          font-weight: 700;
        }

        .room-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-top: 1px solid #edf0ed;
          border-bottom: 1px solid #edf0ed;
        }

        .room-meta strong {
          color: #8b6b3f;
        }

        .room-meta span {
          font-size: 13px;
          color: #68716b;
        }

        .admin-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .admin-actions button {
          flex: 1;
          padding: 11px;
          border: 0;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 800;
        }

        .edit-btn {
          background: #eef1ed;
          color: #18231d;
        }

        .delete-btn {
          background: #f5e7e5;
          color: #a33d32;
        }

        .loading,
        .empty {
          background: white;
          padding: 60px;
          text-align: center;
          border-radius: 18px;
          color: #68716b;
        }

        @media (max-width: 900px) {

          .admin-rooms-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 650px) {

          .admin-page {
            padding: 30px 15px;
          }

          .admin-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .field.full,
          .available-field {
            grid-column: auto;
          }

          .admin-rooms-grid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </div>
  );
}