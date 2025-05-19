import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";


// API to create a new room for a hotel
// POST /api/rooms
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) return res.json({ success: false, message: "No Hotel found" });

    // upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    // Wait for all uploads to complete
    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
      owner: req.user._id,
    });

    res.json({ success: true, message: "Room created successfully" });
} catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms
// GET /api/rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: 'hotel',
        populate: {
          path: 'owner', 
          select: 'image',
        },
      }).sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// API to get all rooms for a specific hotel
// GET /api/rooms/owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    
    res.json({ success: false, message: error.message });
  }
};

// API to toggle availability of a room
// POST /api/rooms/toggle-availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "Room availability Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE /api/rooms/:id
export const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;

    // Find the room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    // Only the owner can delete the room
    if (!room.owner || room.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Unauthorized to delete this room" });
    }

    // Delete room
    await Room.findByIdAndDelete(roomId);

    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Room Error:", error);
    res.status(500).json({ success: false, message: "Server error while deleting room" });
  }
};