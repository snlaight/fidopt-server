const express = require("express");
const tokenValidation = require("../functions/tokenAuthentication")
const router = express.Router();

const Veterinario = require("../models/usuario");

router.get("/veterinarios", async (req, res) => {
  let veterinarios = await Veterinario.find({rol: true})
    .then((todosLosVeterinarios) => {
      return todosLosVeterinarios;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(veterinarios);
});

router.get("/veterinario/:id", async (req, res) => {
 let idVeterinario= req.params.id;
 console.log(idVeterinario)
  let veterinario = await Veterinario.findById(idVeterinario).then((vetEncontrado)=>{
    console.log(vetEncontrado)
    return vetEncontrado
  }).catch((error)=>{
    res.send({
      message: "Veterinario no existe o ID incorrecto"
    })
  });
  res.send(veterinario);
});


router.put("/actualizarVeterinario/:id", async (req, res, token) => {
  let myToken = req.headers.token;
  let veterinarioValidate = await tokenValidation(res, myToken, true);
  if (!veterinarioValidate) {
    return;
  }
  let nombreVeterinario = req.body.nombre;
  let nombreVeterinaria = req.body.veterinaria;
  let ratingVeterinario = req.body.rating;
  let idVet = veterinarioValidate._id
 let  veterinarioActualizado = await Veterinario.findByIdAndUpdate(idVet.toString(), {
    nombre: nombreVeterinario,
    veterinaria: nombreVeterinaria,
    rating: ratingVeterinario,
  }).then((vetCompletado)=>{
    return vetCompletado
  }).catch((error)=>{
    console.log(error)
  })
  console.log({veterinarioActualizado})
      res.redirect(`/veterinario/${veterinarioActualizado._id}`);
});

router.delete("/borrarVeterinario/:id", async (req, res) => {
  let myToken = req.headers.token;
  let veterinario = await tokenValidation(res, myToken, true);
  if (!veterinario) {
    return;
  }
  let idVeterinario = veterinario._id
  Veterinario.findByIdAndDelete(idVeterinario.toString()).then((veterinarioBorrado) => {
    res.redirect("/veterinarios");
  });
});

module.exports = router;
