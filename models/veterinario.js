const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaVeterinarios = new Schema({
    nombre: {type: String},
    veterinaria: {type: String},
    perros: {type: String},
    rating: {type: Number},
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
});

const Veterinario = mongoose.model("Veterinario", esquemaVeterinarios)
module.exports = Veterinario;