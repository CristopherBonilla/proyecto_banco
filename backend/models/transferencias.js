'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransferenciasSchema = Schema({
    cedula_Emisor: Number,
    cedula_Destinatario: Number,
    cuenta_Emisor: String,
    cuenta_Destino: String,
    monto: Number,
    descripcion: String,
    saldoActual: Number,
    SaldoAnterios: Number,
    FechaTrasferencia: Date
});
module.exports = mongoose.model('Transferencia', TransferenciasSchema);
