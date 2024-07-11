//2
'use strict'
var express = require('express');
var router = express.Router();
var clientecontrollers = require('../controllers/cliente.controllers');

//para las img
//var multiparty = require('connect-multiparty');
//var multipartyMiddleWare = multiparty({ uploadDir: './uploads' });


//pagina Inicio
router.get('/inicio', clientecontrollers.inicio); //llamando a ese archivo
//ver todos los clientes
router.get('/clientes',clientecontrollers.getMostrarClientes);
//guardar cliente
router.post('/guardar-cliente', clientecontrollers.saveCliente);
//obtener un solo Cliente
router.get('/cliente',clientecontrollers.getCliente);
//validar cedula
router.post('/validarCedula',clientecontrollers.validarCedula);
//actualizar Cliente
router.put('/actualizar-cliente/:id',clientecontrollers.actualizarCliente);


//Uso de correoController





module.exports = router;