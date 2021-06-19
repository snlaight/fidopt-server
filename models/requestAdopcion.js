const mongoose = require("mongoose");
const Schema =mongoose.Schema;

import esquemaUsuario from './usuario'

const adoptionRequest = new Schema ({
    idUser: [{type: Schema.Types.ObjectId, ref: "Usuario"}],
    name: [{type: esquemaUsuario.paths.nombre, ref:"Usuario"}],
    adoptionReason: {type:String, required:true, message:"This field is required."},
    status: {type:Array},
    ciudad: {type:String},
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
});

const requestAdoption = mongoose.model("Adoption Request", adoptionRequest);
module.exports = requestAdoption;