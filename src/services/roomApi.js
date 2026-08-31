const API_URL = "http://localhost:5000/api/rooms";

export const getRooms = async ({
  destination = "",
  checkIn = "",
  checkOut = "",
  guests = "",
} = {}) => {
  const params = new URLSearchParams();

  if (destination.trim()) {
    params.append("destination", destination.trim());
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

  const query = params.toString();

  const url = query
    ? `${API_URL}?${query}`
    : API_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch rooms (${response.status})`
    );
  }

  return await response.json();
};


export const getRoom = async (id) => {
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
};


export const createRoom = async (roomData) => {
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
};


export const updateRoom = async (
  id,
  roomData
) => {
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
};


export const deleteRoom = async (id) => {
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
};