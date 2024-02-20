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

router.get("/adicionar", (req, res) =>{
    res.render("adicionar")
})

//para guardar
router.post("/", async (req, res)=>{
    const body = req.body
    console.log(body)
    //para guardar
    try {
        await Estudiante.create(body)
        res.redirect("/estudiantes")
    } catch (error) {
        console.log("ERROR:--> ", error)
    }
})

//ver un registro
router.get("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const estudianteDb = await Estudiante.findOne({_id:id})
        //console.log(estudianteDb)
        res.render("detalle", {
            estudiante: estudianteDb,
            error: false 
        })
    } catch (error) {
        console.log("ERROR: ",error)
        res.render("detalle", {
            error: true,
            mensaje: "No existe ese identificador del documento."
        })
    }
})

//eliminar
router.delete("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        //crear un objeto y un json para poder eliminar de la BD
        const estudianteDb = await Estudiante.findByIdAndDelete({_id: id})
        if (estudianteDb){
            res.json({estado: true, mensaje: "Se ha eliminado."})
        }
        else{
            res.json({estado: false, mensaje: "No se puede eliminar."})
        }

    } catch (error) {
        console.log("Error: ", error)
    }
})

//actualizar
router.put("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const estudianteDb = await Estudiante.findOne({_id:id})
        console.log(estudianteDb)
        res.render("modificar", {
            estudiante : estudianteDb,
            error: false
        })
    } catch (error) {
        console.log("ERROR: ", error)
        res.render("modificar", {
            error: true,
            mensaje: "NO se encuentra el documento."
        })
    }
})

module.exports = router