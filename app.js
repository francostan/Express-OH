'use strict';

const express = require('express');
//eliminamos bodyParser porque ya no lo necesitamos deprecated
const app = express();
module.exports = app; // esto es solo para testear mas facil
//configuramos el middleware
app.use(express.json());
// acuerdense de agregar su router o cualquier middleware que necesiten aca
//requerimos router para redirigir a las rutas
const router = require('./routes/index');
//USAMOS EL APP.USE MIDDLEWARE PARA QUE TODAS LAS RUTAS QUEDEN REDIRIJIDAS
//usamos api por convencion. ahora no es necesario poner /api/users
app.use("/", router);
// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3000);
