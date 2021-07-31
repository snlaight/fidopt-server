require("dotenv").config();
require("./dbConfig/dbConfig");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Perro = require("./models/perro");
const Veterinario = require("./models/veterinario");
const Usuario = require("./models/usuario");

const salt = bcrypt.genSaltSync(10);

let veterinarios = [
  {
    nombre: "Andres Cladera",
    rol: true,
    ciudad: "Madrid",
    email: "andres@cladera.com",
    password: "12312",
    veterinaria: "Save the Dogs",
    perros: ["60c5fbdc8c3b2720a2e13640"],
    rating: 3.5,
  },
  {
    nombre: "Santiago Ponzinnibio",
    rol: true,
    ciudad: "Buenos Aires",
    password: "1222312",
    Requests: [],
    email: "santiago@ponzi.com",
    veterinaria: "CanConnect",
    perros: ["60c5fbdc8c3b2720a2e13641", "60c5fbdc8c3b2720a2e13643"],
    rating: 5,
  },
  {
    nombre: "Lautaro Torres",
    rol: true,
    ciudad: "Barcelona",
    password: "1123312",
    email: "lautaro@torres.com",
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

let usuarios = [
  {
    nombre: "Eduardo Dev",
    rol: false,
    edad: 29,
    email: "eduardo@dev.com",
    password: "123456",
    ciudad: "Zaragoza",
    razasFavoritas: ["Pastor Aleman", "Chihuahua", "Rottweiler"],
    interesEnAdoptar: true,
  },
  {
    nombre: "Santiago Laight",
    rol: false,
    edad: 32,
    email: "snlaight10@gmail.com",
    password: "holahola",
    ciudad: "Barcelona",
    razasFavoritas: ["Golden Retriever", "Mezcla", "Pastor Aleman"],
    perrosFavoritos: ["60c5fbdc8c3b2720a2e13643"],
    interesEnAdoptar: true,
  },
  {
    nombre: "Roberto Baggio",
    rol: false,
    edad: 45,
    email: "robert@baggio.com",
    password: "54785632",
    ciudad: "Milan",
    razasFavoritas: ["Ninguna"],
    interesEnAdoptar: false,
  },
  {
    nombre: "Helena Golab",
    rol: false,
    edad: 32,
    email: "email@falso.com",
    password: "49383r82",
    ciudad: "Varsovia",
    razasFavoritas: ["Todas las razas"],
    interesEnAdoptar: true,
  },
];

usuarios.forEach((usuario) => {
  let hashPass = bcrypt.hashSync(usuario.password, salt);
  usuario.password = hashPass;
});
veterinarios.forEach((usuario) => {
  let hashPass = bcrypt.hashSync(usuario.password, salt);
  usuario.password = hashPass;
});

Perro.deleteMany()
  .then(() => {
    return Perro.create(perros);
  })
  .then((perrosCreados) => {
    console.log(
      `${perrosCreados.length} perros creados con los siguientes nombres:`
    );
    console.log(perrosCreados.map((perro) => perro.nombre));
    Usuario.deleteMany()
      .then(() => {
        console.log(Usuario);
        return Usuario.create(usuarios);
      })
      .then((usuariosCreados) => {
        console.log(
          `${usuariosCreados.length} usuarios creados con los siguientes nombres:`
        );
        console.log(usuariosCreados.map((usuario) => usuario.nombre));
      });
    Veterinario.deleteMany()
      .then(() => {
        return Usuario.create(veterinarios);
      })
      .then((veterinariosCreados) => {
        console.log(
          `${veterinariosCreados.length} veterinarios creados con los siguientes nombres:`
        );
        console.log(veterinariosCreados.map((usuarios) => usuarios.nombre));
      })
      .then(() => {
        mongoose.disconnect();
      });
  })

  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
