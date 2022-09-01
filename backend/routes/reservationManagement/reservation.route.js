const express = require("express");
const Reservations = require("../../models/reservationManagement/reservation.model");
const router = express.Router();

/* Add New Reservation */
router.post("/add", async (req, res) => {
  try {
    const newReservation = new Reservations(req.body);
    await newReservation.save();
    return res.status(201).json({ message: "Reservation Added Successfully" });

  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Get All Reservation Details */
router.get("/getAll", async (req, res) => {
  try {
    const details = await Reservations.find();
    return res.status(200).json({
      data: details,
      message: "Fetched All Successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Delete a Reservation */
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Reservations.findByIdAndDelete(id);

    return res.status(200).json({
      data: details,
      message: "Reservation Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
module.exports = router;
