require("dotenv").config();
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const Veterinario = require("../models/veterinario");
let tokenValidation = async (response, token, rol) => {
  let rolUsuario = Usuario.rol;
  let validationResult = {};
  if (!token) {
    response.send({
      auth: false,
      token: null,
      message: "Token not valid.",
    });
    return;
  }
  try {
    validationResult = jwt.verify(token, process.env.SECRET_WORD);
  } catch (error) {
    response.send({
      auth: false,
      token: null,
      message: "Token not valid.",
    });
    return;
  }
  let veterinarioCheck = await Usuario.findById(validationResult.id, rolUsuario, {
    password: 0,
  }).populate("perros");
  if (!veterinarioCheck) {
    response.send({
      auth: false,
      message: "Veterinario no existe",
    });
    return;
  }
  if (rolUsuario != true) {
    response.send({
      auth: false,
      message: "No puedes acceder si no eres veterinario.",
    });
  }
  return veterinarioCheck;
};

module.exports = tokenValidation;
