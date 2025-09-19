import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: String,
      required: true,
      ref: "Hotel",
    },
    amenities: {
      type: Array,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
