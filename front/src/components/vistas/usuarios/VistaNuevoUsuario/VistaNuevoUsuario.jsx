import React from "react";
import FormularioNuevoUsuario from "../../../formularios/usuarios/FormularioNuevoUsuario/FormularioNuevoUsuario";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function VistaNuevoUsuario() {

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
          <Link to="/todos-usuarios" >
            <button>
              Ver Usuarios
            </button>
          </Link>
        </div>
      </div>

      <hr />

      <div class="row">
        <FormularioNuevoUsuario />
      </div>

    </div>
  );
};