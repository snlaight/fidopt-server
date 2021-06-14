const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const esquemaUsuario = new Schema ({
    nombre: {type:String},
    edad: {type: Number},
    email: {type: String},
    ciudad: {type: String},
    razas_favoritas: {type: Array},
    interesEnAdoptar: {type:Boolean},
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
});

const Usuario = mongoose.model("Usuario", esquemaUsuario);
module.exports = Usuario;
