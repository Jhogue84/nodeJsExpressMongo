const express = require("express")
const router = express.Router()
const Estudiante = require("../models/estudiantes")

//router.get("/",(req,res)=>{
router.get("/",async(req,res)=>{
    try {
        const arrayEstudiantesDB = await Estudiante.find()
        //console.log(arrayEstudiantesDB)
        res.render("estudiantes",{       
            arrayEstudiantes : arrayEstudiantesDB
            /*
            //ya no utilizamos datos quemados
            arrayEstudiantes :[
                {"nombres": "Pepe", "apellidos": "Perez", "edad": 20, "curso": "Php"},
                {"nombres": "Ana", "apellidos": "Martinez", "edad": 23, "curso": "Python"},
                {"nombres": "Maria", "apellidos": "Ayala", "edad": 18, "curso": "Java"}
            ]
            */
        })
        
    } catch (error) {
        console.log("ERROR: "+error)
    }

})

module.exports = router