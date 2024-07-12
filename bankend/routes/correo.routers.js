'use strict'
var express=require('express');
const router = express.Router();
const correoController = require('../controllers/correo.controllers');

//  api/correo
router.post('/validar-email',correoController.validarCorreo);

router.post('/verificar-email',correoController.verificarCorreoLogin);

router.post('/bienvenido',correoController.bienvenidoBanquito);

router.post('/actualizar-usuario',correoController.actualizarUsuario);

router.post('/reenviar',correoController.reenviar);

router.post('/actualizar-usuario',correoController.actualizarUsuario);

router.post('/nuevas-temp',correoController.nuevasCredencialesTemp);

router.post('/actualizar-correo',correoController.actualizarCliente);

module.exports = router; 