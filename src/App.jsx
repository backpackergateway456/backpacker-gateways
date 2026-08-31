import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import AdminRooms from "./pages/AdminRooms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            HOME
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================================
            ALL ROOMS
        ========================================= */}

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        {/* =========================================
            SINGLE ROOM DETAILS
            Example:
            /rooms/6a8a9fa9747dd7c94ad3712f
        ========================================= */}

        <Route
          path="/rooms/:id"
          element={<RoomDetails />}
        />

        {/* =========================================
            BOOKING
            Example:
            /booking?room=ROOM_ID
        ========================================= */}

        <Route
          path="/booking"
          element={<Booking />}
        />

        {/* =========================================
            ADMIN ROOM MANAGEMENT
            Add / Edit / Delete Rooms
        ========================================= */}

        <Route
          path="/admin/rooms"
          element={<AdminRooms />}
        />

      </Routes>
    </BrowserRouter>
  );
}