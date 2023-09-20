import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import ListaUsuarios from "../../../contenedores/listas/ListaUsuarios/ListaUsuarios";
import { buscarCategorias } from "../../../../redux/actions/categoriasActions/categoriasActions";
import ListaCategorias from "../../../contenedores/listas/ListasCategorias/ListasCategorias";

export default function VistaTodasCategorias() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  // console.log(usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      ...credenciales,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);
  // console.log(credenciales);

  function handlerBuscarReferidos() {
    dispatch(buscarCategorias(credenciales));
  };

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Link to="/nueva-categoria" >
            <button>
              Nueva Categoria
            </button>
          </Link>
        </div>
        <div class="col">
          <button
            onClick={() => handlerBuscarReferidos()}
          >
            Buscar
          </button>
        </div>
      </div>

      <div class="row">
        <h3>Todas las Categorias</h3>
      </div>

      <div class="row">
        <ListaCategorias />
      </div>

    </div>
  );
};