const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaPerros = new Schema({
    nombre: {type: String},
    edad:{type:Number},
    raza: {type: String},
    vacuna_antirrabica: {type: Boolean},
    castrado: {type: String},
    chip:{type:String},
    veterinaria: [{type: Schema.Types.ObjectId, ref: "Veterinario"}],
},{
    timestamps: {
        createdAt:"created_at",
        updatedAt: "updated_at"
    }
});

const Perro = mongoose.model("Perro", esquemaPerros);
module.exports = Perro;