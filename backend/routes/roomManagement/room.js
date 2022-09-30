const express = require("express");
const router = express.Router();
const {addRoom,editRoom, getRooms, getSingleRoom, deleteRoom,searchRoom} = require("../../controllers/room")

router.route("/room/get").get(getRooms);
router.route("/room/getOne/:id").get(getSingleRoom);
router.route("/room/create").post(addRoom);
router.route("/room/update/:id").put(editRoom);
router.route("/room/delete/:id").delete(deleteRoom);
router.route("/room/search/:searchTerm").get(searchRoom);
module.exports=router;

