const mongoose = require("mongoose");
const Schema = mongoose.Schema;

import esquemaUsuario from './usuario';

const calendarRequest = new Schema ({
    idUser: [{type: Schema.Types.ObjectId, ref: "Usuario"}],
    name: [{type: esquemaUsuario.paths.nombre, ref:"Usuario"}],
    date: {type: Date},
    status: {type: Array},
    motiveForVisit: {type: string, require:"Please state your motive for this visit."},
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
});

const meetingRequest = mongoose.model("Calendar Request", calendarRequest);
module.exports = meetingRequest;