import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import FormularioNuevaCategoria from "../../../formularios/categorias/FormularioNuevaCategoria/FormularioNuevaCategoria";
import FormularioNuevoProducto from "../../../formularios/productos/FormularioNuevoProducto/FormularioNuevoProducto";

export default function VistaNuevoProducto() {

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link
            to="/">Inicio</Link>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Link to="/todos-productos" >
            <button>
              Ver Productos
            </button>
          </Link>
        </div>
      </div>

      <hr />

      <div class="row">
        <FormularioNuevoProducto />
      </div>

    </div>
  );
};