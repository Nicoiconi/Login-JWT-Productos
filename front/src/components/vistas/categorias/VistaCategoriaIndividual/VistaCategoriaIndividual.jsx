import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

import { borrarCategoria, buscarCategoriaPorId, buscarCategorias } from "../../../../redux/actions/categoriasActions/categoriasActions";
import { setCategoriaPorId } from "../../../../redux/slices/categoriasSlice/categoriasSlice";
import FormularioEditarCategoria from "../../../formularios/categorias/FormularioEditarCategoria/FormularioEditarCategoria";

export default function VistaCategoriaIndividual() {

  const dispatch = useDispatch();

  const { id } = useParams();
  // console.log(id);

  const [credenciales, setCredenciales] = useState();
  const [switchHabilitarEdicion, setSwitchHabilitarEdicion] = useState(false);
  const [switchHabilitarEliminar, setSwitchHabilitarEliminar] = useState(false);

  const categoria = useSelector(state => state.categorias.categoriaIndividual);
  // console.log(usuario);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  // console.log(usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);
  // console.log(credenciales);

  function switcharHabilitarEdicion() {
    setSwitchHabilitarEliminar(false);
    if (switchHabilitarEdicion) setSwitchHabilitarEdicion(false);
    if (!switchHabilitarEdicion) setSwitchHabilitarEdicion(true);
  };

  function switcharHabilitarEliminar() {
    setSwitchHabilitarEdicion(false);
    if (switchHabilitarEliminar) setSwitchHabilitarEliminar(false);
    if (!switchHabilitarEliminar) setSwitchHabilitarEliminar(true);
  };

  function handleRefresh() {
    dispatch(buscarCategoriaPorId(id, credenciales));
    dispatch(buscarCategorias(credenciales));
  };

  function handleEliminar() {
    dispatch(borrarCategoria(id, credenciales));
    dispatch(setCategoriaPorId(null));
    dispatch(buscarCategorias(credenciales));
    if (switchHabilitarEliminar) setSwitchHabilitarEliminar(false);
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
          <Link to="/nueva-categoria" ><button>
            Nueva Categoria
          </button></Link>
        </div>

        <div class="col">
          <Link to="/todas-categorias" ><button>
            Categorias
          </button></Link>
        </div>

        <div class="col">
          <button
            onClick={() => handleRefresh()}
          >
            Refresh
          </button>
        </div>
      </div>

      <div class="row">
        <h3>Categoria</h3>
      </div>

      {
        !categoria
          ? <div>
            No hay usuario
          </div>
          : <div>

            <div class="row">

              <div class="col">
                <input type="checkbox" name="habilitar-edicion" onClick={(e) => switcharHabilitarEdicion(e)} checked={switchHabilitarEdicion} /> {"<-- Editar"}
              </div>

              <div class="col">
                {"Eliminar -->"}
                <input type="checkbox" name="habilitar-eliminar" onClick={(e) => switcharHabilitarEliminar(e)} checked={switchHabilitarEliminar} />
              </div>
            </div>

            <div class="col">
              {categoria?.nombre}
            </div>

            <hr />

            <div class="col">
              {
                switchHabilitarEdicion
                  ? <FormularioEditarCategoria
                    setSwitchHabilitarEdicion={setSwitchHabilitarEdicion}
                  />
                  : ""
              }
            </div>

            <div class="row">
              {
                switchHabilitarEliminar
                  ? <div class="col">
                    <button
                      onClick={() => handleEliminar()}
                    >
                      Eliminar
                    </button>
                  </div>
                  : ""
              }
            </div>
          </div>
      }

    </div>
  );
};