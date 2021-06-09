require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.USUARIO_BD}:${process.env.PASSWORD_BD}@cluster0.j5oo4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then((x) => {
    console.log(
      `Conectado a la base de datos de Mongo! Nombre de la base de datos : "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error al conectar con Mongo", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error, req, res, next)=>{
    res.status(400).json({
        status:"error",
        message: error.message
    });
});

