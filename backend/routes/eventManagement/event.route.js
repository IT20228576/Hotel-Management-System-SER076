const express = require("express");
const router = express.Router();
const events = require("../../models/eventManagement/event.model");



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// event/new event

router.post("/event/new",async(req,res)=>{
    // console.log(req.body);
    const {EventName,EventType,EventDate,ClientName,EventStartDate,EventEndDate,NoOfParticipants} = req.body;

    if(!EventName || !EventType || !EventDate || !ClientName || !EventStartDate || !EventEndDate || !NoOfParticipants){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preevent = await events.findOne({EventType:EventType});
        console.log(preevent);

        if(preevent){
            res.status(422).json("this is event is already present");
        }else{
            const addevent = new events({
                EventName,EventType,EventDate,ClientName,EventStartDate,EventEndDate,NoOfParticipants
            });

            await addevent.save();
            res.status(201).json(addevent);
            console.log(addevent);
        }

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

router.patch("/event/update/:id",async(req,res)=>{
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










