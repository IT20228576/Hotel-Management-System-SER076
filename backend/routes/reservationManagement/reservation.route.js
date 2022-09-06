const express = require("express");
const Reservations = require("../../models/reservationManagement/reservation.model");
const router = express.Router();

/* Function Generate a New Reference Number */
const ReferenceNumberGenerator = async () => {
  try {
    // Find the last generated Reference Number
    const data = await Reservations.find({}, "referenceNumber -_id")
      .sort({ _id: -1 })
      .limit(1);

    // Get the value from the key-value pair
    var lastRef = data.map(({ referenceNumber }) => referenceNumber);

    // Convert the array to string, and get only the number part
    var result = lastRef.toString().substring(4);

    // coerce the previous variable as a number and add 1
    var incrementValue = +result + 1;

    // insert leading zeroes with a negative slice
    incrementValue = ("00000" + incrementValue).slice(-4);

    // concatenate REF to new value
    const newData = { referenceNumber: "REF".concat(incrementValue) };

    return newData;
  } catch (error) {
    return "Couldn't Generate the Reference Number";
  }
};

/* Add New Reservation */
router.post("/add", async (req, res) => {
  try {
    // assign the data coming from the req body to separate variable
    const oldData = req.body;

    // get newly generated reference number
    const data = await ReferenceNumberGenerator();

    // assign req body data with reference number to be one object
    const newResponse = Object.assign(oldData, data);

    const newReservation = new Reservations(newResponse);
    await newReservation.save();
    return res.status(201).json({ message: "Reservation Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Get All Reservation Details */
router.get("/getAll", async (req, res) => {
  try {
    const details = await Reservations.find().sort({ createdAt: -1 });
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

/* Search a Reservation */
router.get("/search/:searchTerm", async (req, res) => {
  try {
    const details = await Reservations.find({
      $or: [
        {
          referenceNumber: { $regex: req.params.searchTerm },
        },
        {
          firstName: { $regex: req.params.searchTerm },
        },
        {
          lastName: { $regex: req.params.searchTerm },
        },
      ],
    });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Update a Reservation */
router.put("/update/:id", async (req, res) => {
  try {
    // assign id to a separate variable
    const id = req.params.id;

    // assign the data coming from the req body to separate variable
    const oldData = req.body;

    const details = await Reservations.findByIdAndUpdate(id, { $set: oldData });

    return res.status(200).json({
      message: "Reservation Updated Successfully",
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
