const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("estudiantes",{
        arrayEstudiantes :[
            {"nombres": "Pepe", "apellidos": "Perez", "edad": 20, "curso": "Php"},
            {"nombres": "Ana", "apellidos": "Martinez", "edad": 23, "curso": "Python"},
            {"nombres": "Maria", "apellidos": "Ayala", "edad": 18, "curso": "Java"}
        ]
    })
})

module.exports = router