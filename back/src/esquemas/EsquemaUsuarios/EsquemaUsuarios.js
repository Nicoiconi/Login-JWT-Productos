const mongoose = require("mongoose");
const moment = require('moment-timezone');


const esquemaUsuarios = mongoose.Schema({
  nombre: {
    type: String,
    require
  },
  acc: {
    type: String,
    require,
    unique: true
  },
  pass: {
    type: String,
    require
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EsquemaCategorias"
  },
  token: {
    type: String
  },
  created_at: {
    type: String,
    immutable: true,
    default: () => moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY')
  },
  modified_at: {
    type: String,
  }
});

module.exports = mongoose.model("EsquemaUsuarios", esquemaUsuarios);