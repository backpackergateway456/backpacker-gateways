import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <article className="room-card">
      <img src={room.image} alt={room.alt} loading="lazy" />

      <div className="room-content">
        <div className="room-top">
          <span className="room-type">{room.type}</span>
          <strong>${room.price}/night</strong>
        </div>

        <h3>{room.name}</h3>

        <p>{room.description}</p>

        <div className="room-meta">
          <span>👥 {room.capacity}</span>
          <span>📶 Free Wi-Fi</span>
        </div>

        <Link to="/booking" className="text-link">
          View & Book →
        </Link>
      </div>
    </article>
  );
}