const mongoose = require("mongoose");
require("dotenv").config();

const Room = require("./models/Room");

const rooms = [
  {
    name: "Phakding Camp One Lodge",
    destination: "Phakding, Everest Region",
    description:
      "Comfortable mountain lodge in Phakding, ideal for trekkers beginning their Everest Base Camp journey.",
    price: 3526,
    capacity: 2,
    beds: "1 Double Bed",
    amenities: [
      "Breakfast Included",
      "Free Cancellation",
      "Mountain View",
      "Hot Shower",
      "Restaurant",
    ],
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Sangrila Guest House",
    destination: "Phakding, Everest Region",
    description:
      "A convenient guest house located around 300 meters from the centre of Phakding.",
    price: 825,
    capacity: 2,
    beds: "1 Double Bed",
    amenities: [
      "Free Cancellation",
      "300 m From Centre",
      "Mountain View",
      "Hot Shower",
      "Restaurant",
    ],
    images: [
      "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Tribeni Lodge",
    destination: "Phakding, Everest Region",
    description:
      "A welcoming mountain lodge in Phakding, suitable for trekkers travelling through the Everest region.",
    price: 1526,
    capacity: 2,
    beds: "1 Double Bed",
    amenities: [
      "Free Cancellation",
      "Prepayment Required",
      "Advance Booking",
      "Mountain View",
      "Hot Shower",
      "Restaurant",
    ],
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Hotel Waterfall Benkar",
    destination: "Benkar, Everest Region",
    description:
      "A peaceful mountain accommodation for trekkers travelling towards Namche Bazaar and Everest Base Camp.",
    price: 1526,
    capacity: 2,
    beds: "1 Double Bed",
    amenities: [
      "Free Cancellation",
      "Prepayment Required",
      "Advance Booking",
      "Mountain View",
      "Restaurant",
      "Hot Shower",
    ],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Buddha Lodges and Restaurants",
    destination: "Monjo, Everest Region",
    description:
      "A convenient mountain lodge and restaurant in Monjo for trekkers on the Everest Base Camp route.",
    price: 518,
    capacity: 2,
    beds: "1 Double Bed",
    amenities: [
      "No Prepayment",
      "Restaurant",
      "Mountain View",
      "Hot Shower",
    ],
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Namche Mountain Lodge",
    destination: "Namche Bazaar, Everest Region",
    description:
      "A comfortable mountain lodge in Namche Bazaar, perfect for trekkers taking an acclimatization break.",
    price: 2500,
    capacity: 2,
    beds: "1 Double Bed",
    amenities: [
      "Mountain View",
      "Restaurant",
      "Hot Shower",
      "WiFi",
      "Breakfast Available",
    ],
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Everest View Mountain Lodge",
    destination: "Khumjung, Everest Region",
    description:
      "A scenic Himalayan lodge surrounded by spectacular mountain landscapes.",
    price: 3200,
    capacity: 2,
    beds: "1 Double Bed",
    amenities: [
      "Mountain View",
      "Breakfast Included",
      "Restaurant",
      "Hot Shower",
      "WiFi",
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Everest Base Camp Lodge",
    destination: "Lobuche, Everest Region",
    description:
      "A traditional high-altitude mountain lodge for trekkers approaching Everest Base Camp.",
    price: 2800,
    capacity: 2,
    beds: "2 Single Beds",
    amenities: [
      "Mountain View",
      "Restaurant",
      "Hot Shower",
      "Breakfast Available",
    ],
    images: [
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Yak & Yeti",
    destination: "Kathmandu, Nepal",
    description:
      "A premium luxury hotel in Kathmandu, ideal for travellers looking for an upscale stay before or after their Himalayan adventure.",
    price: 11226,
    capacity: 2,
    beds: "1 King Bed",
    amenities: [
      "Luxury Hotel",
      "Breakfast Included",
      "Swimming Pool",
      "Restaurant",
      "WiFi",
      "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },

  {
    name: "Aloft Kathmandu Thamel",
    destination: "Thamel, Kathmandu, Nepal",
    description:
      "A modern luxury hotel in Kathmandu offering stylish rooms and contemporary facilities.",
    price: 5214,
    capacity: 2,
    beds: "1 King Bed",
    amenities: [
      "Luxury Hotel",
      "Special Price",
      "Breakfast Included",
      "WiFi",
      "Restaurant",
      "Swimming Pool",
    ],
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    ],
    available: true,
  },
];

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Room.deleteMany({});

    console.log("Old rooms deleted");

    const insertedRooms = await Room.insertMany(rooms);

    console.log(`Successfully inserted ${insertedRooms.length} rooms`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Seed error:", error.message);

    process.exit(1);
  }
};

seedRooms();