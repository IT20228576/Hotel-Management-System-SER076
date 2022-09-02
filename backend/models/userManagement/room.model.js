const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    imageURL: { type: String, required: true },
    roomPrice: { type: Number, required: true },
    roomType: { type: String, required: true, enum:['King room','Twin room'] },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
