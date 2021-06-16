require("dotenv").config();

const mongoose = require("mongoose");

const Perro = require("./models/perro");
const Veterinario = require("./models/veterinario");
// const Usuario = require("./models/usuario");

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

let veterinarios = [
  {
    nombre: "Andres Cladera",
    veterinaria: "Save the Dogs",
    perros: ["60c5fbdc8c3b2720a2e13640"],
    rating: 3.5,
  },
  {
    nombre: "Santiago Ponzinnibio",
    veterinaria: "CanConnect",
    perros: ["60c5fbdc8c3b2720a2e13641", "60c5fbdc8c3b2720a2e13643"],
    rating: 5,
  },
  {
    nombre: "Lautaro Torres",
    veterinaria: "Veterinaria del Barrio",
    perros: ["60c5fbdc8c3b2720a2e13642"],
    rating: 2,
  },
];

let perros = [
  {
    nombre: "Hercules",
    edad: 5,
    _id: "60c5fbdc8c3b2720a2e13640",
    raza: "Pastor Aleman",
    vacuna_antirrabica: true,
    castrado: "No",
    chip: "Si",
    veterinaria: "Save the Dogs",
  },
  {
    nombre: "Kratos",
    edad: 9,
    _id: "60c5fbdc8c3b2720a2e13641",
    raza: "Rottweiler",
    vacuna_antirrabica: true,
    castrado: "Si",
    chip: "No",
    veterinaria: "CanConnect",
  },
  {
    nombre: "Floyd Mayweather",
    edad: 3,
    _id: "60c5fbdc8c3b2720a2e13642",
    raza: "Golden Retriever",
    vacuna_antirrabica: true,
    castrado: "Si",
    chip: "Si",
    veterinaria: "Veterinaria del Barrio",
  },
  {
    nombre: "Freddy Mercury",
    edad: 1,
    _id: "60c5fbdc8c3b2720a2e13643",
    raza: "Chihuaha",
    vacuna_antirrabica: false,
    castrado: "No",
    chip: "No",
    veterinaria: "CanConnect",
  },
];

Perro.deleteMany()
  .then(() => {
    return Perro.create(perros);
  })
  .then((perrosCreados) => {
    console.log(
      `${perrosCreados.length} perros creados con los siguientes nombres:`
    );
    console.log(perrosCreados.map((perro) => perro.nombre));
    Veterinario.deleteMany()
      .then(() => {
        return Veterinario.create(veterinarios);
      })
      .then((veterinariosCreados) => {
        console.log(
          `${veterinariosCreados.length} veterinarios creados con los siguientes nombres:`
        );
        console.log(
          veterinariosCreados.map((veterinarios) => veterinarios.nombre)
        );
      })
      .then(() => {
        mongoose.disconnect();
      });
  })

  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
