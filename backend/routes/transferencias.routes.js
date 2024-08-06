'use strict'
var express=require('express');
var router=express.Router();
var transferenciasController = require('../controllers/transferencias.controller');


var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});

// Guardar una transferencia
router.post('/guardar-transferencia', transferenciasController.saveTransferencia);

// Ver todas las transferencias
router.get('/transferencias', transferenciasController.getTransferencias);

// Obtener transferencias por número de cédula
router.get('/get-transferencias-by-cedula', transferenciasController.getTransferenciasByCedula);


module.exports=router;