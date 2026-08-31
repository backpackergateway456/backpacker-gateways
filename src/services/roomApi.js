const API_URL = "http://localhost:5000/api/rooms";

// =====================================================
// GET ROOMS
// Supports:
// destination
// checkIn
// checkOut
// guests
// =====================================================

export const getRooms = async ({
  destination = "",
  checkIn = "",
  checkOut = "",
  guests = "",
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (destination?.trim()) {
      params.append(
        "destination",
        destination.trim()
      );
    }

    if (checkIn) {
      params.append("checkIn", checkIn);
    }

    if (checkOut) {
      params.append("checkOut", checkOut);
    }

    if (guests) {
      params.append("guests", guests);
    }

    const queryString = params.toString();

    const url = queryString
      ? `${API_URL}?${queryString}`
      : API_URL;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch rooms (${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Room Search Error:", error);
    throw error;
  }
};

// =====================================================
// GET SINGLE ROOM
// GET /api/rooms/:id
// =====================================================

export const getRoom = async (id) => {
  try {
    if (!id) {
      throw new Error("Room ID is required");
    }

    const response = await fetch(
      `${API_URL}/${id}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch room (${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Get Room Error:", error);
    throw error;
  }
};

// =====================================================
// CREATE ROOM
// POST /api/rooms
// =====================================================

export const createRoom = async (roomData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(roomData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to create room (${response.status})`
      );
    }

    return result;
  } catch (error) {
    console.error("Create Room Error:", error);
    throw error;
  }
};

// =====================================================
// UPDATE ROOM
// PUT /api/rooms/:id
// =====================================================

export const updateRoom = async (
  id,
  roomData
) => {
  try {
    if (!id) {
      throw new Error("Room ID is required");
    }

    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(roomData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to update room (${response.status})`
      );
    }

    return result;
  } catch (error) {
    console.error("Update Room Error:", error);
    throw error;
  }
};

// =====================================================
// DELETE ROOM
// DELETE /api/rooms/:id
// =====================================================

export const deleteRoom = async (id) => {
  try {
    if (!id) {
      throw new Error("Room ID is required");
    }

    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to delete room (${response.status})`
      );
    }

    return result;
  } catch (error) {
    console.error("Delete Room Error:", error);
    throw error;
  }
};