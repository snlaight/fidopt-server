const express = require("express");
const router = express.Router();

const tokenValidation = require("../functions/tokenAuthentication");
const Perro = require("../models/perro");
const Usuario = require("../models/usuario");

router.get("/perros", async (req, res) => {
  let perros = await Perro.find()
    .then((todosLosPerros) => {
      return todosLosPerros;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(perros);
});

router.get("/perro/:id", async (req, res) => {
  let idPerro = req.params.id;
  let perro = await Perro.findById(idPerro)
    .then((perroEncontrado) => {
      return perroEncontrado;
    })
    .catch((error) => {
      res.send({
        message: "Perro no existe o ID incorrecto",
      });
    });
  res.send(perro);
});

router.post("/nuevoPerro", async (req, res, token) => {
  let myToken = req.headers.token;
  let veterinario = await tokenValidation(res, myToken, true);
  if (!veterinario) {
    return;
  }
  let nombrePerro = req.body.nombre;
  let edadPerro = req.body.edad;
  let razaPerro = req.body.raza;
  let vacunaPerro = req.body.vacuna_antirrabica;
  let perroCastrado = req.body.castrado;
  let tieneChip = req.body.chip;
  let perroCreado = await Perro.create({
    nombre: nombrePerro,
    edad: edadPerro,
    raza: razaPerro,
    vacuna_antirrabica: vacunaPerro,
    castrado: perroCastrado,
    chip: tieneChip,
  })
    .then((nuevoPerro) => {
      return nuevoPerro;
    })
    .catch((error) => {
      console.log(error);
    });
  await Usuario.findByIdAndUpdate(veterinario._id, {
    $push: { perros: perroCreado._id },
  }).then((usuarioActualizado) => {});
  res.send(perroCreado);
});

router.put("/actualizarPerro/:id", async (req, res) => {
  let myToken = req.headers.token;
  let veterinario = await tokenValidation(res, myToken, true);
  if (!veterinario) {
    return;
  }
  let idPerro = req.params.id;
  let isMine = false;
  veterinario.perros.forEach((perro) => {
    if (idPerro == perro._id.toString()) {
      isMine = true;
    }
  });
  if (isMine == false) {
    res.send({
      auth: false,
      message: "This is not your dog.",
    });
    return;
  }
  let nombrePerro = req.body.nombre;
  let edadPerro = req.body.edad;
  let razaPerro = req.body.raza;
  let vacunaPerro = req.body.vacuna_antirrabica;
  let perroCastrado = req.body.castrado;
  let tieneChip = req.body.chip;
  let actualizarPerro = await Perro.findByIdAndUpdate(idPerro, {
    nombre: nombrePerro,
    edad: edadPerro,
    raza: razaPerro,
    vacuna_antirrabica: vacunaPerro,
    castrado: perroCastrado,
    chip: tieneChip,
  })
    .then((perroActualizado) => {
      return perroActualizado;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(actualizarPerro);
  res.redirect(`/perro/${actualizarPerro._id}`);
});

router.delete("/borrarPerro/:id", async (req, res) => {
  let myToken = req.headers.token;
  let veterinario = await tokenValidation(res, myToken, true);
  if (!veterinario) {
    return;
  }
  let idPerro = req.params.id;
  let isMine = false;
  veterinario.perros.forEach((perro) => {
    if (idPerro == perro._id.toString()) {
      isMine = true;
    }
  });
  if (isMine == false) {
    res.send({
      auth: false,
      message: "This is not your dog.",
    });
    return;
  }
  Perro.findByIdAndDelete(idPerro).then((perroBorrado) => {
    Usuario.findByIdAndUpdate(veterinario._id, {
      $pull: { perros: idPerro },
    }).then((usuarioActualizado) => {
      res.redirect("/perros");
    });
  });
});

module.exports = router;
