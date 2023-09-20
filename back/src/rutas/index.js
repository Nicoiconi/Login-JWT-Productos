const { Router } = require('express');
const router = Router();

//Importo todos los routers;
const rutasUsuarios = require("./rutasUsuarios/rutasUsuarios");
const rutasProductos = require("./rutasProductos/rutasProductos");
const rutasCategorias = require("./rutasCategorias/rutasCategorias");


//Configuro todos los routers
router.use("/usuarios", rutasUsuarios);
router.use("/productos", rutasProductos);
router.use("/categorias", rutasCategorias);


module.exports = router;
