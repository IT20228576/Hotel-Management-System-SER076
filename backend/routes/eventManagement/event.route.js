const express = require("express");
const router = express.Router();
const events = require("../../models/eventManagement/event.model");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');



router.post("/event/new",async(req,res)=>{

    const {EventName,EventType,EventDate,ClientName,EventStartTime,EventEndTime,NoOfParticipants,EventStatus,EventLocation,EventDescription,EventImage} = req.body;

    if(!EventName || !EventType || !EventDate || !ClientName || !EventStartTime || !EventEndTime || !NoOfParticipants || !EventStatus || !EventLocation){
        res.status(422).json("Please enter all data")
        return 0;
    }else if(NoOfParticipants>100){
        res.status(420).json("Maximum Partipants are 100")
        return 0;
    }
    try {
            const addevent = new events({
                EventName,EventType,EventDate,ClientName,EventStartTime,EventEndTime,NoOfParticipants,EventStatus,EventLocation,EventDescription,EventImage
            });

            await addevent.save();
            res.status(201).json(addevent);
            console.log(addevent);

    } catch (error) {
        res.status(422).json(error);
    }
})

// get event data

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

router.patch("/event/update/:id",async(req,res)=>{

    const {EventName,EventType,EventDate,ClientName,EventStartTime,EventEndTime,NoOfParticipants,EventStatus,EventLocation} = req.body;
    if(!EventName || !EventType || !EventDate || !ClientName || !EventStartTime || !EventEndTime || !NoOfParticipants || !EventStatus || !EventLocation){
        res.status(422).json("Please enter all data")
        return 0;
    }
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










