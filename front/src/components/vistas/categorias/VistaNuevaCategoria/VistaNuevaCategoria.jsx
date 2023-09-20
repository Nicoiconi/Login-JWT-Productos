import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import FormularioNuevaCategoria from "../../../formularios/categorias/FormularioNuevaCategoria/FormularioNuevaCategoria";

export default function VistaNuevaCategoria() {

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
          <Link to="/todas-categorias" >
            <button>
              Ver Categorias
            </button>
          </Link>
        </div>
      </div>

      <hr />

      <div class="row">
        <FormularioNuevaCategoria />
      </div>

    </div>
  );
};