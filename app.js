const express = require("express")
const servidor = express();

//const puerto = 3000
const puerto = process.env.PORT || 3000 //Variables de entorno, para deploy en el serv.

//configuracion ruta statica de public
servidor.use(express.static(__dirname + "/public"))

//motor de plantillas
servidor.set("view engine", "ejs")
servidor.set("views", __dirname + "/views")

//rutas
servidor.get("/", (req, res)=>{
    //res.send("Respuesta del servidor en raiz")
    res.render("index", {titulo: "Bienvenidos index con plantilla ejs"})
})

servidor.get("/nosotros", (req, res)=>{
    //res.send("Respuesta de pagina nosotros")
    res.render("nosotros", {titulo: "Pagina de Nosotros"})
})

servidor.use((req, res, next)=>{
    //res.status(404).sendFile(__dirname + "/public/404.html")
    res.status(404).render("404")

})

//escucha
servidor.listen(puerto, ()=>{
    console.log("escuchando desde el puerto:", puerto)
})