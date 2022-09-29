const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    imageURL: { type: String, required: true },
    roomPrice: { type: Number},
    roomType: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//const Room = mongoose.model("room", roomSchema);

module.exports = mongoose.model('Room', RoomSchema);
