'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var clienteRoutes=require('./routes/cliente.routes');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//para procesar metodos GET, POST, etc
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Request-With, Content-Type,Accept, Access-Control-Allow, Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
/* 
app.get('/', (req, res) => {
    res.status(465).send(
        "<h1>Hola, bienvenidos</h1>"
    )
})
*/

//apuntar a la ruta de clientes
app.use('/', clienteRoutes) //archivo externo de todas las rutas
module.exports = app;