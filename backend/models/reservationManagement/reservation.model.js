const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    roomType: { type: String, required: true },
    room: { type: String, required: true },
    checkinDate: { type: new Date("YYYY-mm-dd"), required: true },
    checkinTime: { type: String, required: true },
    checkoutDate: { type: new Date("YYYY-mm-dd"), required: true },
    checkoutTime: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number },
    numberOfRooms: { type: Number, required: true },
    amount: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

const Reservations = new mongoose.model("reservations", ReservationSchema);

module.exports = Reservations;
