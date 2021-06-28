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
  let veterinario = await Veterinario.findById(idVeterinario).then((vetEncontrado)=>{
    return vetEncontrado
  })
  res.send(veterinario);
});


router.put("/actualizarVeterinario/:id", async (req, res, token) => {
  let myToken = req.headers.token;
  let veterinarioValidate = await tokenValidation(res, myToken, true);
  if (!veterinarioValidate) {
    return;
  }
  let idVet = req.params.id;
  let nombreVeterinario = req.body.nombre;
  let nombreVeterinaria = req.body.veterinaria;
  let ratingVeterinario = req.body.rating;
  console.log(idVet)
 let  veterinarioActualizado = await Veterinario.findByIdAndUpdate(idVet, {
    nombre: nombreVeterinario,
    veterinaria: nombreVeterinaria,
    rating: ratingVeterinario,
  }).then((vetCompletado)=>{
    return vetCompletado
  }).catch((error)=>{
    console.log(error)
  })
      res.redirect(`/veterinario/${veterinarioActualizado.id}`);
});

router.delete("/borrarVeterinario/:id", async (req, res) => {
  let myToken = req.headers.token;
  let veterinario = await tokenValidation(res, myToken, true);
  if (!veterinario) {
    return;
  }
  let idVeterinario = req.params.id;
  Veterinario.findByIdAndDelete(idVeterinario).then((veterinarioBorrado) => {
    res.redirect("/veterinarios");
  });
});

module.exports = router;
