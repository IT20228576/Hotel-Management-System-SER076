const Room = require("../models/roomManagement/room.model")
exports.getRooms = async (req, res) => {
  try {

    

    const pageNo = req.query.pageNo || 1;

    const itemsPerPage = req.query.pageSize || 10;

    const skip = (pageNo - 1) * itemsPerPage;


    const count = await Room.estimatedDocumentCount();



    const pageCount = Math.ceil(count / itemsPerPage);

    const details = await Room.find({})

      .sort({ createdAt: -1 })

      .skip(skip)

      .limit(itemsPerPage);



    return res.status(200).json({

      pagination: { count, pageCount },

      data: details,

      message: "Fetched All Successfully",

    });

  } catch (error) {

    return res.status(500).json({ message: error });

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

exports.searchRoom = async(req, res)=>{

  try {

    const details = await Room.find({

      $or: [

        {

          roomName: { $regex: req.params.searchTerm },

        },



      ],

    });



    return res.status(200).json({

      data: details,

    });

  } catch (error) {

    return res.status(500).json({ message: error });

  }

}

