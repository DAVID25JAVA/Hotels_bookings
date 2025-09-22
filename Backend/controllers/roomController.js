import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// Create post API for new room for hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, amenities, pricePerNight } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) return res.json({ success: false, messahe: "No Hotel found" });

    // upload image on cloudinary
    const uploadImage = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response?.secure_url;
    });

    // wait for all to upload to complete
    const image = await Promise.all(uploadImage);

    // save in database
    await Room.create({
      hotel: hotel?._id,
      amenities: JSON.parse(amenities),
      pricePerNight: +pricePerNight,
      roomType,
      image,
    });

    res.json({ success: true, message: "Room create successfully" });
  } catch (error) {
    res.json({ success: false, message: error?.message });
  }
};

// get all room API;
export const getAllRoom = async (req, res) => {
  try {
    const room = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    return res.json({ success: true, room });
  } catch (error) {
    return res.json({ success: false, message: error?.message });
  }
};

// get all room by specific hotel
export const geAlltRoomByHotel = async (req, res) => {
  try {
    const hotelData = await Hotel({ owner: req.auth.userId });
    const rooms = await Room.find({
      hotel: hotelData?._id.toString(),
    }).populate("hotel");
    return res.json({ success: true, rooms });
  } catch (error) {
    return res.json({ success: false, message: error?.message });
  }
};

// ApI to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData?.isAvailable;
    await roomData.save();
    return res.json({ success: true, roomData });
  } catch (error) {
    return res.json({ success: false, message: error?.message });
  }
};
