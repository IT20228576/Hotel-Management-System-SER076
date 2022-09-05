const express = require("express");
const router = express.Router();
const {addRoom,editRoom, getRooms, getSingleRoom} = require("../../controllers/room")

router.route("/room/get").get(getRooms);
router.route("/room/getOne/:id").get(getSingleRoom);
router.route("/room/create").post(addRoom);
router.route("/room/update/:id").put(editRoom);
module.exports=router;

