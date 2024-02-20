const express = require("express");
const bodyParser = require("body-parser")
require("dotenv").config()
//const router = require("./router/rutas");//esta opcion con la parte de las rutas en lineas mas a bajo
const servidor = express();

//tratamiento de datos como/desde formularios y json
//parse application/x-www-form-urlencoded
servidor.use(bodyParser.urlencoded({ extended: false}))
//parse application/json
servidor.use(bodyParser.json())

//const puerto = 3000, con la nueva configuracion de variable de entorno el asignamos el 3001
const puerto = process.env.PORT || 3000 //Variables de entorno, para deploy en el hostin.

//conexion a base de datos con mongoose
const mongoose = require("mongoose")

//pasan a variables de entorno al arcnivo .env, despues de intalar dotenv
const protocolo = process.env.PROTOCOLO
const ip = process.env.IP
const dbname = process.env.DBNAME

//const uri = protocolo+"://"+ip+"/"+dbname//una forma de armar la cadena, comillas doble, no sirve intercalar.
const uri = `${process.env.PROTOCOLO}://${process.env.IP}/${process.env.DBNAME}`//solo funciona con ese tipo de comillas.
console.log("uri completa ",uri)

mongoose.connect(uri)
    .then(()=>{console.log("Conectado a mongodb")})
    .catch(err=>{console.log("Error de conexion: "+err)})

//configuracion ruta statica de la carpeta public
servidor.use(express.static(__dirname + "/public"))

//motor de plantillas
servidor.set("view engine", "ejs")
servidor.set("views", __dirname + "/views")

//middleware, las rutas a utilizar desde rutas.js
//servidor.use(express.Router(router))//esta opcion con la importacion en la cabezera
servidor.use("", require("./router/rutas"))
servidor.use("/estudiantes", require("./router/estudiantes"))

//middleware
servidor.use((req, res, next)=>{
    //res.status(404).sendFile(__dirname + "/public/404.html")
    res.status(404).render("404")

})

//escucha
servidor.listen(puerto, ()=>{
    console.log("escuchando desde el puerto:", puerto)
})