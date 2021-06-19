const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const calendarRequest = new Schema ({
    idUser: [{type: Schema.Types.ObjectId, ref: "Usuario"}],
    date: {type: Date},
    status: {type: String},
    motiveForVisit: {type: string, required:true},
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
});

const meetingRequest = mongoose.model("Calendar Request", calendarRequest);
module.exports = meetingRequest;