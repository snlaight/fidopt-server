const express = require("express");
const tokenValidation =
  require("../functions/tokenAuthentication").tokenValidation;
const router = express.Router();

const Veterinario = require("../models/usuario");

router.get("/veterinarios", async (req, res) => {
  console.log(myToken);
  let veterinarios = await Veterinario.find()
    .then((todosLosVeterinarios) => {
      return todosLosVeterinarios;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(veterinarios);
});

router.get("/veterinario", async (req, res) => {
  let myToken = req.headers.token;
  let veterinario = await tokenValidation(res, myToken);

  if (!veterinario) {
    return;
  }

  res.send(veterinario);
});

router.post("/nuevoVeterinario", async (req, res) => {
  let nombreVeterinario = req.body.nombre;
  let nombreVeterinaria = req.body.veterinaria;
  let nombrePerros = req.body.perros;
  let ratingVeterinario = req.body.rating;
  let veterinarioCreado = await Veterinario.create({
    nombre: nombreVeterinario,
    veterinaria: nombreVeterinaria,
    perros: nombrePerros,
    rating: ratingVeterinario,
  })
    .then((nuevoVeterinario) => {
      return nuevoVeterinario;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(veterinarioCreado);
});

router.put("/actualizarVeterinario/:id", (req, res) => {
  let nombreVeterinario = req.body.nombre;
  let idVeterinario = req.params.id;
  let nombreVeterinaria = req.body.veterinaria;
  let nombrePerros = req.body.perros;
  let ratingVeterinario = req.body.rating;
  Veterinario.findByIdAndUpdate(idVeterinario, {
    nombre: nombreVeterinario,
    veterinaria: nombreVeterinaria,
    perros: nombrePerros,
    rating: ratingVeterinario,
  })
    .then((veterinarioActualizado) => {
      res.redirect(`/veterinario/${veterinarioActualizado.id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/borrarVeterinario/:id", (req, res) => {
  let idVeterinario = req.params.id;
  Veterinario.findByIdAndDelete(idVeterinario).then((veterinarioBorrado) => {
    res.redirect("/veterinarios");
  });
});

module.exports = router;
