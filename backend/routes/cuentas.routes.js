'use strict'
var express=require('express');
var router=express.Router();
var cuentasController=require('../controllers/cuentas.controller');
var multiparty=require('connect-multiparty');
const cuenta = require('../models/cuenta');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de inicio
router.get('/inicio',cuentasController.inicio);
//guardar una cuenta
router.post('/guardar-cuenta',cuentasController.saveCuenta);
//ver todas las cuentas
router.get('/cuentas',cuentasController.getCuentas);
//ValidacionDeCuenta
router.post('/validarNumeroCuenta',cuentasController.validarNumeroCuenta);
//transaccion
router.put('/transaccion-interna',cuentasController.transaccionInterna);
//generar numero de cuenta (12digitos)aleatorio
router.post('/generarNumero',cuentasController.generarNumeroCuenta);
//Obtener una cuenta a partir de un numero de cedula.
router.post('/get-Cuenta-byCI',cuentasController.getCuentaByCI);
//actualizar Cuenta
router.post('/actualizar-cuenta',cuentasController.actualizarCuenta);
//obtener cuenta a partir del numero de cuenta
router.post('/getCuenta',cuentasController.getCuenta);



module.exports=router;