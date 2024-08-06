'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransferenciasSchema = Schema({
    cedula: Number,
    cuenta_Emisor: String,
    cuenta_Destino: String,
    monto:Number,
    descripcion: String
});
module.exports = mongoose.model('Transferencia', TransferenciasSchema);