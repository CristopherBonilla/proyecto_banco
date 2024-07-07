'use strict'

var Cliente = require("../models/cliente");
var fs = require('fs');
const path = require("path");

var controller = {
    inicio: function (req, res) {
        return res.status(201).send(
            "<h1>Hola 2 es el banco</h1>"
        );
    },

    getMostrarClientes: async function (req, res) {
        try {
            const clientes = await Cliente.find({}).sort().exec();
            if (!clientes) {
                return res.status(404).send({ message: 'No Existen Clientes en el banco' });
            }
            return res.status(200).send({ clientes });
        } catch (err) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },

    saveCliente: async function (req, res) {
        try {
            var cliente = new Cliente();
            var params = req.body;
    
            cliente.nombres = params.nombres;
            cliente.apellidos = params.apellidos;
            cliente.cedula = params.cedula;
            cliente.codigo_dactilar = params.codigo_dactilar;
            cliente.fecha_nacimiento = params.fecha_nacimiento;
            cliente.correo_electronico = params.correo_electronico;
            cliente.direccion = params.direccion;
            cliente.ocupacion = params.ocupacion;
            cliente.numero_telefono = params.numero_telefono;
    
            const clienteGuardado = await cliente.save();
            if (!clienteGuardado) {
                return res.status(404).send({ message: 'No se ha guardado el cliente' });
            }
            return res.status(200).send({ cliente: clienteGuardado });
        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar' });
        }
    },
    validarCedula: async function (req, res) {
        try {
            var params = req.body;
            console.log("Parametros en la funcion ValidarCuenta",params);
            var cedula = params.cedula;
            console.log(cedula);
    
            const guardarcliente = await Cliente.findOne({ "cedula": cedula }).exec();
            if (!guardarcliente) {
                return res.status(200).send(false);
            }
            return res.status(200).send(true);
        } catch (err) {
            return res.status(500).send(true);
        }
    },

    getCliente: async function (req, res) {
        try {
            var params = req.body;
            console.log("Parametros en la funcion getCliente:", params);
            var cedula = params.cedula;
    
            const cliente = await Cliente.findOne({ "cedula": cedula }).exec();
            if (!cliente) {
                return res.status(404).send({ message: 404 });
            }
            return res.status(200).send(cliente);
        } catch (err) {
            return res.status(500).send({ message: 500 });
        }
    },

    actualizarCliente: async function (req, res) {
        try {
            var clienteId = req.params.id;
            var update = req.body;
    
            const clienteActualizado = await Cliente.findByIdAndUpdate(clienteId, update, { new: true }).exec();
    
            if (!clienteActualizado) {
                return res.status(404).send({ message: 'El Cliente no existe para actualizar' });
            }
    
            return res.status(200).send({ cliente: clienteActualizado });
        } catch (err) {
            return res.status(500).send({ message: 'Error al actualizar los datos' });
        }
    }
    
    
}
module.exports = controller;