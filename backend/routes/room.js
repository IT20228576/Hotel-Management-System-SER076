const express = require("express");
const router = express.Router();
const {addRoom,editRoom} = require("../controllers/room.js");

router.route("/room/create").post(addRoom);
router.route("/room/update").put(editRoom);
module.exports=router;

