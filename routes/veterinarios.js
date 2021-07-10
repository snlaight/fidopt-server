const express = require("express");
const tokenValidation = require("../functions/tokenAuthentication");
const Usuario = require("../models/usuario");
const router = express.Router();

const Veterinario = require("../models/usuario");

router.get("/veterinarios", async (req, res) => {
  let veterinarios = await Veterinario.find({ rol: true })
    .then((todosLosVeterinarios) => {
      return todosLosVeterinarios;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(veterinarios);
});

router.get("/veterinario", async (req, res, token) => {
  let myToken = req.headers.token;
  let tokenValidate = await tokenValidation(res, myToken, true);
  if (!tokenValidate) {
    return;
  }
  let obj = {
    user: tokenValidate,
    auth: true,
    message: "You are permitted."
  };

  res.send(obj);
});

router.get("/veterinario/:id", async (req, res) => {
  let idVeterinario = req.params.id;
  let veterinario = await Veterinario.findById(idVeterinario)
    .then((vetEncontrado) => {
      console.log(vetEncontrado);
      return vetEncontrado;
    })
    .catch((error) => {
      res.send({
        message: "Veterinario no existe o ID incorrecto",
      });
    });
  res.send(veterinario);
});

router.put("/actualizarVeterinario/:id", async (req, res, token) => {
  let myToken = req.headers.token;
  let veterinarioValidate = await tokenValidation(res, myToken, true);
  if (!veterinarioValidate) {
    return;
  }
  let idVeterinario = req.params.id;
  let idVet = veterinarioValidate._id;
  let usuarioEncontrado = await Usuario.findById(idVeterinario).then((usuario) => {
    let isMine = false;
    if (idVeterinario == idVet.toString()) {
      isMine = true;
    }
    if (isMine == false) {
      res.send({
        auth: false,
        message: "This is not your profile.",
      });
      return
    }
    return usuario;
  });
  let nombreVeterinario = req.body.nombre;
  let nombreVeterinaria = req.body.veterinaria;
  let veterinarioActualizado = await Veterinario.findByIdAndUpdate(
    idVet.toString(),
    {
      nombre: nombreVeterinario,
      veterinaria: nombreVeterinaria,
    }
  )
    .then((vetCompletado) => {
      return vetCompletado;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log({ veterinarioActualizado });
  res.redirect(`/veterinario/${veterinarioActualizado._id}`);
});

router.delete("/borrarVeterinario/:id", async (req, res, token) => {
  let myToken = req.headers.token;
  let veterinarioValidate = await tokenValidation(res, myToken, true);
  if (!veterinarioValidate) {
    return;
  }
  let isMine = false;
  let idVeterinario = req.params.id;
  let validateId = await Usuario.findOne({ _id: idVeterinario }).then(() => {
    let idVet = veterinarioValidate._id;
    if (idVeterinario == idVet) {
      isMine = true;
    }
  });
  if (isMine == false) {
    res.send({
      auth: false,
      message: "You can't delete a profile that isn't yours.",
    });
    return;
  }
  console.log({ validateId });
  Veterinario.findByIdAndDelete(idVeterinario.toString()).then(
    (veterinarioBorrado) => {
      res.redirect("/veterinarios");
    }
  );
});

module.exports = router;
