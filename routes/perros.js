const express = require("express");
const router = express.Router();

const Perro = require("../models/perro");

router.get("/perros",async(req,res)=>{
    let perros = await Perro.find()
    .then((todosLosPerros)=>{
        return todosLosPerros
    })
    .catch((error)=>{
        console.log(error);
    })
    res.send(perros)
});

router,get("/perro/:id",async(req,res)=>{
let idPerro = req.params.id;
let perro = await Perro.findById(idPerro).then((perroEncontrado)=>{
    return perroEncontrado;
});
res.send(perro);
});

router.post("/nuevoPerro", async(req,res)=>{
    let nombrePerro = req.body.nombre;
    let edadPerro = req.body.edad;
    let razaPerro = req.body.raza;
    let vacunaPerro= req.body.vacuna_antirrabica;
    let perroCastrado = req.body.castrado;
    let tieneChip = req.body.chip;
    let perroCreado = await Perro.create({
        nombre: nombrePerro,
        edad: edadPerro,
        raza: razaPerro,
        vacuna_antirrabica: vacunaPerro,
        castrado: perroCastrado,
        chip: tieneChip,
    })
    .then((nuevoPerro)=>{
        return nuevoPerro
    })
    .catch((error)=>{
        console.log(error);
    })
    res.send(perroCreado)
});

router.put("/actualizarPerro/:id",async(res,req)=>{
    let idPerro = req.params.id;
    let nombrePerro = req.body.nombre;
    let edadPerro = req.body.edad;
    let razaPerro = req.body.raza;
    let vacunaPerro= req.body.vacuna_antirrabica;
    let perroCastrado = req.body.castrado;
    let tieneChip = req.body.chip;
    Perro.findByIdAndUpdate(idPerro, {
        nombre: nombrePerro,
        edad: edadPerro,
        raza: razaPerro,
        vacuna_antirrabica: vacunaPerro,
        castrado: perroCastrado,
        chip: tieneChip,
    })
    .then((perroActualizado)=>{
        res.redirect(`/perro/${perroActualizado._id}`);
    })
    .catch((error)=>{
        console.log(error);
    });
});


router.delete("/borrarPerro/:id",(req,res)=>{
    let idPerro = req.params.id;
    Perro.findByIdAndDelete(idPerro).then((perroBorrado)=>{
        res.redirect("/perros");
    });
});

module.exports=router;