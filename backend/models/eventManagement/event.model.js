const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    EventName: {
        type: String,
        required: true
    },
    EventType: {
        type: String,
        required: true,
        unique: true
    },
    EventDate: {
        type: String,
        required: true
    },
    ClientName: {
        type: String,
        required: true
    },
    EventStartDate: {
        type: String,
        required: true
    },
    EventEndDate: {
        type: String,   
        required: true
    },
    NoOfParticipants: {
        type: String,
        required: true
    },

    EventStatus:{

        type:String,
        required:true
        },

        EventLocation:{

            type:String,
            required:true
            },

            EventDescription:{

                type:String,
                required:true
                },

                EventImage:{

                    type:String,
                    required:true
                    }
});

const events = new mongoose.model("events",eventSchema);


module.exports = events;