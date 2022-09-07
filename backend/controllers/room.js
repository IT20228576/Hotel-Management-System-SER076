const Room = require("../models/roomManagement/room.model")
exports.getRooms = async (req, res) => {
    try {
      let rooms = await Room.find({}, { __v: 0 });
      res.json(rooms);
    } catch (err){
      res.status(400).json({ error: err });
    }

};
exports.addRoom = async (req, res) => {
    console.log("test");
  try {
    const newRoom = new Room({
      roomName: req.body.roomName,
      roomNumber: req.body.roomNumber,
      imageURL: req.body.imageURL,
      roomPrice: req.body.roomPrice,
      roomType: req.body.roomType,
      description: req.body.description,
    });

    let room = await newRoom.save();

    res.status(201).json({ message: "sucess" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getSingleRoom = async(req,res) => {
    const roomid = req.params.id;
    try {
      let rooms = await Room.findOne({_id: roomid});
      res.json(rooms);
    } catch(err) {
      res.status(400).json({ error: err });
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

exports.deleteRoom = async (req, res) => {
  try {
    var room = await Room.findByIdAndDelete(req.params.id);

    res.status(201).json({ message: "sucess" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

