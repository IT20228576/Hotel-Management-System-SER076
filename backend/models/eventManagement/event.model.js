const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    EventName: {
        type: String,
        // required: true
    },
    EventType: {
        type: String,
        // required: true,
        // unique: true
    },
    EventDate: {
        type: String,
        
    },
    ClientName: {
        type: String,
       
    },
    EventStartTime: {
        type: String,
        
    },
    EventEndTime: {
        type: String,   
        
    },
    NoOfParticipants: {
        type: String,
      
    },

    EventStatus:{

        type:String,
      
        },

        EventLocation:{

            type:String,
         
            },

            EventDescription:{

                type:String,
           
                },

                EventImage:{

                    type:String,
                
                    },

                    photo: {
                        type: String
                    }
});

const events = new mongoose.model("events",eventSchema);


module.exports = events;