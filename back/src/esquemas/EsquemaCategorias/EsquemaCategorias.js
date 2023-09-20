const mongoose = require("mongoose");
const moment = require('moment-timezone');


const esquemaCategorias = mongoose.Schema({
  nombre: {
    type: String,
    require
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

module.exports = mongoose.model("EsquemaCategorias", esquemaCategorias);