const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaPerros = new Schema({
    nombre: {type: String, required:true},
    edad:{type:Number},
    raza: {type: String},
    vacuna_antirrabica: {type: Boolean, required:true},
    castrado: {type: String},
    chip:{type:String, required: true},
    veterinario : [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
    // veterinaria: [{type: Schema.Types.ObjectId, ref: "Veterinario"}],
},{
    timestamps: {
        createdAt:"created_at",
        updatedAt: "updated_at"
    }
});

const Perro = mongoose.model("Perro", esquemaPerros);
module.exports = Perro;