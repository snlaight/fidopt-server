const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const esquemaUsuario = new Schema ({
    nombre: {type:String, required:"Name is required."},
    edad: {type: Number},
    email: {type: String, required:"Email is required."},
    password:{type: String},
    ciudad: {type: String, required:"City is required."},
    razasFavoritas: {type: Array},
    interesEnAdoptar: {type:Boolean},
    perrosFavoritos: [{type: Schema.Types.ObjectId, ref: "Perro"}],
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
});

const Usuario = mongoose.model("Usuario", esquemaUsuario);
module.exports = Usuario;
