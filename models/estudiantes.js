const mongoose = require("mongoose")
const Schema = mongoose.Schema

//realizando el esquema
const estudianteSchema = new Schema({
    nombres: String,
    apellidos: String,
    edad: BigInt,
    clase: String
})

//creado el modelo
const Estudiante = mongoose.model("Estudiante", estudianteSchema)

module.exports = Estudiante