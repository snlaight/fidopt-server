require("dotenv").config();

const express = require("express");
const authRoutes = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const minPassLength = 8;
const expirationTime = 21600;

const salt = bcrypt.genSaltSync(10);

authRoutes.post("/signup", async (req, res) => {
  const usuario = req.body.usuario;
  const pass = req.body.pass;
  const rol = req.body.rol;
  const ciudad = req.body.ciudad;
  const email = req.body.email;
  console.log(usuario, pass, email, rol, ciudad)
  if (!usuario || !pass || !rol || !ciudad || !email) {
    res.send({
      auth: false,
      token: null,
      message: "Provide username and password",
    });
    return;
  }
  if (pass.length < minPassLength) {
    res.send({
      auth: false,
      token: null,
      message:
        "Please make your password at least 8 characters long for security purposes",
    });
    return;
  }
  let foundUsuario = await Usuario.findOne({ email: email }).then(
    (repeatedusuario) => {
      return repeatedusuario;
    }
  );
  if (foundUsuario != null) {
    res.send({
      auth: false,
      token: null,
      message: "Email is already taken. Choose another one.",
    });
    return;
  }
  const hashPass = bcrypt.hashSync(pass, salt);

  let nuevoUsuario = await Usuario.create({
    nombre: usuario,
    password: hashPass,
    rol: rol,
    email: email,
    ciudad: ciudad,
  })
    .then((usuarioCreado) => {
      return usuarioCreado;
    })
    .catch((error) => {
      res.send({
        auth: false,
        token: null,
        message: `We have the following error: ${error}`,
      });
      return;
    });

  const newToken = jwt.sign(
    { id: nuevoUsuario._id, rol: nuevoUsuario.rol },
    process.env.SECRET_WORD,
    {
      expiresIn: expirationTime,
    }
  );
  res.send({ auth: true, token: newToken });
  if (newToken.rol == true) {
    res.redirect(`/homeVeterinario`);
  }
  if (newToken.rol == false) {
    res.redirect(`/homeUsuario`);
  }
});

authRoutes.post("/login", async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  
  let usuario = await Usuario.findOne({ email: email }).then(
    (usuarioEncontrado) => {
      return usuarioEncontrado;
    }
  );

  if (!usuario) {
    res.send({ auth: false, token: null, message: "User doesn't exist" });
    return;
  }
  let passwordIsValid = await bcrypt.compare(pass, usuario.password);
  if (passwordIsValid == false) {
    res.send({ auth: false, token: null, message: "Incorrect Password" });
    return;
  }
  const newToken = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.SECRET_WORD,
    {
      expiresIn: expirationTime,
    }
  );

  res.send({ auth: true, token: newToken, message: "Login succesful!" });
});

authRoutes.get("/private", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    res.send({
      auth: false,
      message: "Token is not valid",
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.SECRET_WORD);

  const usuario = await Usuario.findById(decoded.id, { password: 0 }).populate(
    "perrosFavoritos"
  );
  if (!usuario) {
    res.send({ auth: false, message: "User does not exist" });
    return;
  }
  res.send(usuario);
});

module.exports = authRoutes;
