const express = require("express");
const Reservations = require("../../models/reservationManagement/reservation.model");
const router = express.Router();

/* Add New Reservation */
router.post("/add", async (req, res) => {
  try {    
    let newReservation = new Reservations(req.body);

    await newReservation.save();
    return res.status(201).json({ message: "Reservation Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
