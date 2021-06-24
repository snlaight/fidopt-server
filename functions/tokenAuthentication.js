require("dotenv").config();
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario")
let tokenValidation = async (response,token, rol)=>{
    let rolUsuario = rol ;
    let validationResult = {};

    if(!token){
        response.send({
            auth: false,
            token: null,
            message: "Token not valid."
        });
        return
    }
    try {
        validationResult = jwt.verify(token, process.env.SECRET_WORD);
    } catch(error){
        response.send({
            auth: false, 
            token: null, 
            message: "Token not valid."
        })
        return
    }
    let veterinario = await Usuario.findById(validationResult.id, usuario.rol, {password: 0}).populate("perros");
    if(!veterinario){
        response.send({
            auth: false,
            message: "Veterinario no existe",
        })
        return
    }
    if (usuario.rol != rolUsuario){
        response.send({
            auth: false,
            message: "No puedes acceder si no eres veterinario."
        })
    }
    return veterinario
};

module.exports = tokenValidation