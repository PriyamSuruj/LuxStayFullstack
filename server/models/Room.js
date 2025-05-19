import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    hotel: { type: String, ref: "Hotel", required: true },
    roomType: { type: String, required: true }, // "Single", "Double", "Luxury Room", "Family Suite"
    pricePerNight: { type: Number, required: true },
    amenities: { type: Array, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    owner: {
          type: String,
          required: true,
          }

  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
