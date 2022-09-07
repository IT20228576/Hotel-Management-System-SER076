const express = require("express");
const router = express.Router();
const events = require("../../models/eventManagement/event.model");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// event/new event

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'EventImageUploads');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.post("/event/new",upload.single('EventImage'),async(req,res)=>{
    // console.log(req.body);
    // const photo = req.file.filename;
    const {EventName,EventType,EventDate,ClientName,EventStartTime,EventEndTime,NoOfParticipants,EventStatus,EventLocation,EventDescription,EventImage} = req.body;

    if(!EventName){
        res.status(422).json("plz fill the data");
    }else if(NoOfParticipants>100){
        res.status(420).json("Maximum Partipants are 100");
    }

    try {
        
        // const preevent = await events.findOne("");
        // console.log(preevent);

        // if(preevent){
        //     res.status(422).json("Already reserved");
        // }else{
            const addevent = new events({
                EventName,EventType,EventDate,ClientName,EventStartTime,EventEndTime,NoOfParticipants,EventStatus,EventLocation,EventDescription,EventImage
            });

            await addevent.save();
            res.status(201).json(addevent);
            console.log(addevent);
        // }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get eventdata

router.get("/event/view",async(req,res)=>{
    try {
        const eventdata = await events.find();
        res.status(201).json(eventdata)
        console.log(eventdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual event

router.get("/event/vew/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const eventindividual = await events.findById({_id:id});
        console.log(eventindividual);
        res.status(201).json(eventindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update event data

router.patch("/event/update/:id",upload.single('EventImage'),async(req,res)=>{
    try {
        const {id} = req.params;

        const updatedevent = await events.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updatedevent);
        res.status(201).json(updatedevent);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete event
router.delete("/event/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletevent = await events.findByIdAndDelete({_id:id})
        console.log(deletevent);
        res.status(201).json(deletevent);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;










