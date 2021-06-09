require("dotenv").config();

const mongoose = require("mongoose");

const Perro = require("./models/perro");
const Veterinario = require("./models/veterinario");
const Usuario = require("./models/usuario");

mongoose
  .connect(
    `mongodb+srv://${process.env.USUARIO_BD}:${process.env.PASSWORD_BD}@cluster0.j5oo4.mongodb.net/primera-base-de-datos?retryWrites=true&w=majority`,
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

  let perros = [
      {
          nombre: "Hercules",
          edad: 5 ,
          raza: "Pastor Aleman",
          vacuna_antirabica: "Si",
          castrado: "No",
          chip: "Si",
      },
      {
        nombre: "Kratos",
        edad: 9 ,
        raza: "Rottweiler",
        vacuna_antirabica: "Si",
        castrado: "Si",
        chip: "No",
    },
    {
        nombre: "Konan",
        edad: 3 ,
        raza: "Golden Retriever",
        vacuna_antirabica: "Si",
        castrado: "Si",
        chip: "Si",
    },
    {
        nombre: "Freddy Mercury",
        edad: 1 ,
        raza: "Chihuaha",
        vacuna_antirabica: "No",
        castrado: "No",
        chip: "No",
    },
  ];
  Perro.deleteMany()
  .then(()=>{
      return perro.create(perros);
  })
  .then((perrosCreados)=>{
console.log(`${perrosCreados.length} perros creados con los siguientes nombres:`
);
console.log(perrosCreados.map((perro)=> perro.nombre));
  })
  .then(()=>{
      mongoose.disconnect();
  })
  .catch((err)=>{
      mongoose.disconnect();
      throw err ;
  });

  

