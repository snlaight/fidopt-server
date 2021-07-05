const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Request = new Schema(
  {
    idUser: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
    adoptionReason: {
      type: String,
    },
    id: { type: String },
    status: { type: String },
    ciudad: { type: String },
    date: { type: Date },
    motiveForVisit: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const requestMeetingOrAdoption = mongoose.model("Request", Request);

module.exports = requestMeetingOrAdoption;
