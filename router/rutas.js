const express = require("express")
const router = express.Router();

//rutas
//servidor.get("/", (req, res)=>{
//ahora cambiamos la constante de servidor por router
router.get("/", (req, res)=>{
    //res.send("Respuesta del servidor en raiz")
    res.render("index", {titulo: "Bienvenidos index con plantilla ejs"})
})

router.get("/nosotros", (req, res)=>{
    //res.send("Respuesta de pagina nosotros")
    res.render("nosotros", {titulo: "Pagina de Nosotros"})
})

//ya creadas las rutas debemos exportar el router (servidor)
module.exports = router