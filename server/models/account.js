const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crear el schema para account

const accountSchema = new Schema({
  titular: { type: String, required: true },
  capital: { type: Number, required: true },
  numero_cuenta: { type: String, required: true },
  transacciones: [{
    valor: { type: Number, required: true },
    fecha: { type: Date },
    concepto: { type: String }
  }]
}, { timestamps: {} });

module.exports = mongoose.model('Accounts', accountSchema);