const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const esquemaUsuario = new Schema ({
    nombre: {type:String, required:true},
    edad: {type: Number},
    email: {type: String, required:true},
    password:{type: String},
    ciudad: {type: String, required:true},
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
