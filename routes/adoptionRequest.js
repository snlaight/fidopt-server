const express = require("express");
const router = express.Router();

const tokenValidation = require("../functions/tokenAuthentication");
const Perro = require("../models/perro");
const adoptionRequest = require("../models/Requests");
const Usuario = require("../models/usuario");
const Veterinario = require("../models/usuario");

router.get("/adoptionRequests", async (req, res) => {
  let adoptionRequests = await adoptionRequest
    .find()
    .then((allAdoptionRequests) => {
      return allAdoptionRequests;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(adoptionRequests);
});

router.get("/adoptionRequest/:id", async (req, res) => {
  let idRequest = req.params.id;
  let requestAdoption = await adoptionRequest
    .findByID(idRequest)
    .then((requestFound) => {
      return requestFound;
    });
  res.send(requestAdoption);
});

router.post("/newAdoptionRequest/:idPerro", async (req, res) => {
  let myToken = req.headers.token;
  let usuario = await tokenValidation(res, myToken, false);
  if (!usuario) {
    return;
  }
  let idPerro = req.params.idPerro;
  let idUsuario = usuario._id;
  let reasonForAdoption = req.body.adoptionReason;
  let currentCity = req.body.ciudad;
  let pending = "Pending";
  let createdRequest = await adoptionRequest
    .create({
      idUser: idUsuario,
      adoptionReason: reasonForAdoption,
      ciudad: currentCity,
      status: pending,
    })
    .then((newRequest) => {
      return newRequest;
    })
    .catch((error) => {
      console.log(error);
    });
  let idRequest = createdRequest._id;
  await Usuario.findByIdAndUpdate(idUsuario, {
    $push: { adoptionRequests: idRequest },
  })
    .then((usuarioActualizado) => {})
    .catch((error) => {
      console.log(error);
    });
  await Veterinario.findOneAndUpdate(
    { perros: idPerro },
    {
      $push: { adoptionRequests: idRequest },
    }
  )
    .then((veterinarioActualizado) => {})
    .catch((error) => {
      console.log(error);
    });
  res.send(createdRequest);
});

router.put("/updateAdoptionRequest/:id", async (req, res) => {
  let myToken = req.headers.token;
  let veterinario = await tokenValidation(res, myToken, true);
  if (!veterinario) {
    return;
  }
  let reasonForAdoption = req.body.adoptionReason;
  let requestID = req.params.id;
  let currentCity = req.body.ciudad;
  let currentStatus = req.body.status;
  adoptionRequest
    .findByIdAndUpdate(requestID, {
      adoptionReason: reasonForAdoption,
      ciudad: currentCity,
      status: currentStatus,
    })
    .then((updatedAdoptionRequest) => {
      res.redirect(`/adoptionRequest/${updatedAdoptionRequest.id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/deleteAdoptionRequest/:id", (req, res) => {
  let idRequest = req.params.id;
  adoptionRequest.findByIDAndDelete(idRequest).then((deletedRequest) => {});
  Usuario.findOneAndUpdate(
    { adoptionRequest: idRequest },
    { $pull: { adoptionRequest: idRequest }}
  ).then((usuarioActualizado) => {});
  res.redirect("/adoptionRequests");
});

module.exports = router;
