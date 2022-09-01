const Room = require("../models/room.model.js");
exports.addRoom = async (req, res) => {

    try {

        const newRoom = new Room({

            roomName: req.body.roomName,

            roomNumber: req.body.roomNumber,

            imageURL: req.body.imageURL,

            roomPricer: req.body.roomPricer,

            roomType: req.body.roomType,

            description: req.body.description,

        });

        let room = await newRoom.save();

        res.status(201).json({ message: "sucess" });

    } catch (err) {

        res.status(400).json({ message: err });

    }






};
exports.editRoom = async (req, res) => {

    try {

        var room = await Room.findByIdAndUpdate(req.params.id, {

            $set: req.body,

        });

        res.status(201).json({ message: "sucess" });

    } catch (error) {

        res.status(400).json({ message: error });

    }





};