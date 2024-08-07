'use strict'
var Transferencia = require('../models/transferencias');
var Cuenta = require('../models/cuenta');

var controller = {
    saveTransferencia: async function (req, res) {
        try {
            var params = req.body;

            // Obtener las cuentas involucradas
            var cuentaEmisor = await Cuenta.findOne({ "numero_cuenta": params.cuenta_Emisor }).exec();
            var cuentaDestino = await Cuenta.findOne({ "numero_cuenta": params.cuenta_Destino }).exec();

            if (!cuentaEmisor) {
                return res.status(404).send({ message: 'Cuenta del emisor no encontrada' });
            }

            if (!cuentaDestino) {
                return res.status(404).send({ message: 'Cuenta del destinatario no encontrada' });
            }

            // Validar cédulas desde las cuentas
            var cedulaEmisor = cuentaEmisor.cedula;
            var cedulaDestinatario = cuentaDestino.cedula;

            if (!cedulaEmisor) {
                return res.status(404).send({ message: 'Cédula del emisor no encontrada en la cuenta emisora' });
            }

            if (!cedulaDestinatario) {
                return res.status(404).send({ message: 'Cédula del destinatario no encontrada en la cuenta destinataria' });
            }

            if (cuentaEmisor.monto_inicial < params.monto) {
                return res.status(400).send({ message: 'Fondos insuficientes en la cuenta emisora' });
            }

            if (cuentaEmisor.monto_maximo < params.monto) {
                return res.status(400).send({ message: 'Monto de transferencia excede el límite permitido' });
            }

            // Crear una nueva transferencia
            var transferencia = new Transferencia();
            transferencia.cedula_Emisor = cedulaEmisor;
            transferencia.cedula_Destinatario = cedulaDestinatario;
            transferencia.cuenta_Emisor = params.cuenta_Emisor;
            transferencia.cuenta_Destino = params.cuenta_Destino;
            transferencia.monto = params.monto;
            transferencia.descripcion = params.descripcion;
            transferencia.SaldoAnterios = cuentaEmisor.monto_inicial;
            transferencia.saldoActual = cuentaEmisor.monto_inicial - params.monto;
            transferencia.FechaTrasferencia = Date.now(); // Fecha actual

            // Guardar la transferencia en la base de datos
            var transferenciaGuardada = await transferencia.save();

            if (!transferenciaGuardada) {
                return res.status(404).send({ message: 'No se pudo registrar la transferencia' });
            }

            // Actualizar las cuentas involucradas
            cuentaEmisor.monto_inicial = cuentaEmisor.monto_inicial - parseInt(params.monto);
            cuentaDestino.monto_inicial = cuentaDestino.monto_inicial + parseInt(params.monto);

            await cuentaEmisor.save();
            await cuentaDestino.save();

            return res.status(200).send({ message: 'Transferencia realizada con éxito' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al procesar la transferencia', error: error.message });
        }
    },

    getTransferencias: function (req, res) {
        Transferencia.find({}).sort().exec((err, transferencias) => {
            if (err) return res.status(500).send({ message: 'Error al recuperar los datos!!!' });
            if (!transferencias) return res.status(404).send({ message: 'No hay transferencias para mostrar' });
            return res.status(200).send({ transferencias });
        });
    },

    getTransferenciasByCedula: function (req, res) {
        console.log("Recolectando datos de las transferencias del usuario:");
        var params = req.body;
        var cedula = params.cedula;
        
        Transferencia.find({
            $or: [
                { "cedula_Emisor": cedula },
                { "cedula_Destinatario": cedula }
            ]
        }, (err, transferencias) => {
            if (err) return res.status(500).send({ message: 'Error al buscar las transferencias' });
            if (!transferencias || transferencias.length === 0) return res.status(404).send({ message: 'Transferencias no encontradas' });
            return res.status(200).send(transferencias);
        });
    }
};

module.exports = controller;
