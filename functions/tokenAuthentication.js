require("dotenv").config();
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const Veterinario = require("../models/veterinario");

let tokenValidation = async (response, token, rol) => {
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

  if (validationResult.rol == true) {
   let veterinarioCheck = await Usuario.findById(validationResult.id, {
      password: 0,
    }).populate("perros")
    console.log(veterinarioCheck);
    if (!veterinarioCheck) {
      response.send({
        auth: false,
        message: "usuario no existe",
      });
      return;
    }
    if (validationResult.rol != rol) {
      response.send({
        auth: false,
        message: "You are not permitted here.",
      });
    } 
    return veterinarioCheck
  } else if (validationResult.rol == false) {
   let checkUsuario = await Usuario.findById(validationResult.id, {
      password: 0,
    }).populate("perrosFavoritos")
    console.log(checkUsuario);
    if (!checkUsuario) {
      response.send({
        auth: false,
        message: "usuario no existe",
      });
      return;
    }
    if (validationResult.rol != rol) {
      response.send({
        auth: false,
        message: "You are not permitted here.",
      });
  
    }
    return checkUsuario
  }
  // const usuarioCheck = await  Usuario.findById(validationResult.id, {
  //   password: 0,
  // }).populate("perrosFavoritos")
  
  
  // return usuarioCheck;
};

module.exports = tokenValidation;
