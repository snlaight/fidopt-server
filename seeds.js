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
    edad: 5,
    raza: "Pastor Aleman",
    vacuna_antirabica: TRUE,
    castrado: "No",
    chip: "Si",
    veterinaria: "Save the Dogs",
  },
  {
    nombre: "Kratos",
    edad: 9,
    raza: "Rottweiler",
    vacuna_antirabica: TRUE,
    castrado: "Si",
    chip: "No",
    veterinaria: "CanCollect",
  },
  {
    nombre: "Floyd Mayweather",
    edad: 3,
    raza: "Golden Retriever",
    vacuna_antirabica: TRUE,
    castrado: "Si",
    chip: "Si",
    veterinaria: "Veterinaria del Barrio",
  },
  {
    nombre: "Freddy Mercury",
    edad: 1,
    raza: "Chihuaha",
    vacuna_antirabica: FALSE,
    castrado: "No",
    chip: "No",
    veterinaria: "CanCollect",
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
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });

let veterinarios = [
  {
    nombre: "Andres Ayala",
    veterinaria: "Save the Dogs",
    perros: "Hercules",
    rating: 3.5,
  },
  {
    nombre: "Santiago Ponzinnibio",
    veterinaria: "CanConnect",
    perros: "Kratos, Freddy Mercury",
    rating: 5,
  },
  {
    nombre: "Lautaro Torres",
    veterinaria: "Veterinaria del Barrio",
    perros: "Floyd Mayweather",
    rating: 2,
  },
];

Veterinario.deleteMany()
.then(()=>{
  return Veterinario.create(veterinarios)
})
.then((veterinariosCreados)=>{
  console.log(`${veterinariosCreados.length} veterinarios creados con los siguientes nombres:`)
  console.log(veterinariosCreados.map((veterinarios)=>veterinarios.nombre))
})
.then(()=>{
  mongoose.disconnect();
})
.catch((err)=>{
  mongoose.disconnect();
  throw err
});