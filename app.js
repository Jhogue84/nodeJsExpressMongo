const express = require("express");
//const router = require("./router/rutas");//esta opcion con la parte de las rutas en lineas mas a bajo
const servidor = express();

//const puerto = 3000
const puerto = process.env.PORT || 3000 //Variables de entorno, para deploy en el hostin.

//conexion a base de datos con mongoose
const mongoose = require("mongoose")
const protocolo = "mongodb"
const ip = "127.0.0.1:27017"
const dbname = "proyectos1"

const uri = protocolo+"://"+ip+"/"+dbname

mongoose.connect(uri)
    .then(()=>{console.log("Conectado a mongodb")})
    .catch(err=>{console.log("Erro de conexion: "+err)})

//configuracion ruta statica de public
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