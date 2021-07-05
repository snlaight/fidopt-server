const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaUsuario = new Schema(
  {
    id: { type: String },
    nombre: { type: String, required: true },
    edad: { type: Number },
    rol: { type: Boolean },
    rating: { type: Number },
    perros: [{ type: Schema.Types.ObjectId, ref: "Perro" }],
    email: { type: String, required: true },
    password: { type: String },
    veterinaria: { type: String },
    ciudad: { type: String, required: true },
    razasFavoritas: { type: Array },
    interesEnAdoptar: { type: Boolean },
    perrosFavoritos: [{ type: Schema.Types.ObjectId, ref: "Perro" }],
    meetingRequests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    adoptionRequests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    Requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Usuario = mongoose.model("Usuario", esquemaUsuario);
module.exports = Usuario;
