require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.USUARIO_BD}:${process.env.PASSWORD_BD}@cluster0.j5oo4.mongodb.net/primera-base-de-datos?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
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

const veterinarios = require('./routes/veterinarios');
app.use('/',veterinarios)
const perros = require('./routes/perros')
app.use('/',perros);
 const usuarios = require('./routes/usuarios');
 app.use('/',usuarios);

const authentication = require("./routes/authentication")
app.use('/',authentication);

app.listen(process.env.PORT,()=>{
    console.log(`Escuchando en http://localhost:${process.env.PORT}`);
});