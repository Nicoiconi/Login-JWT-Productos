const mongoose = require("mongoose");
const moment = require('moment-timezone');

const esquemaProductos = mongoose.Schema({
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EsquemaCategorias"
  },
  nombre: {
    type: String,
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


module.exports = mongoose.model("EsquemaProductos", esquemaProductos);