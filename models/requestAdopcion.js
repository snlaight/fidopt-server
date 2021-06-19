const mongoose = require("mongoose");
const Schema =mongoose.Schema;


const adoptionRequest = new Schema ({
    idUser: [{type: Schema.Types.ObjectId, ref: "Usuario"}],
    adoptionReason: {type:String, required:true, message:"This field is required."},
    status: {type:String},
    ciudad: {type:String},
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
});

const requestAdoption = mongoose.model("Adoption Request", adoptionRequest);
module.exports = requestAdoption;