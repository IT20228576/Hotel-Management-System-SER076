const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    image: { type: String, required: true },
    roomPrice: { type: Number },
    roomType: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model('Room', RoomSchema);
