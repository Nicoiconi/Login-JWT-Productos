import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { crearCategoria } from "../../../../redux/actions/categoriasActions/categoriasActions";

export default function FormularioNuevaCategoria() {

  const dispatch = useDispatch();

  const [nuevaCategoria, setNuevaCategoria] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  // console.log(usuarioLogeado);

  useEffect(() => {
    setNuevaCategoria({
      ...nuevaCategoria,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);
  // console.log(nuevaCategoria);

  function handlerDatosNuevaCategoria(e) {
    const { name, value } = e.target;

    setNuevaCategoria({
      ...nuevaCategoria,
      [name]: value
    });
  };
  console.log(nuevaCategoria);

  function handleSubmit(e) {
    // e.preventDefault();
    dispatch(crearCategoria(nuevaCategoria));
  };

  return (
    <div class="container-fluid text-center">
      <form onSubmit={(e) => handleSubmit(e)}>


        <div class="row">
          <div class="col-4">
            <h5>Nueva Categoria</h5>
          </div>
          <div class="col">
            {
              nuevaCategoria?.nombre
                ? <button type="submit">CREAR</button>
                : "Campos requeridos: Nombre"
            }
          </div>
        </div>

        <hr />

        <div class="row">

          <div class="col">

            <div class="row">
              <div class="col-3">
                <label htmlFor="inputNombreUsuario">
                  nombre
                </label>
              </div>
              <div class="col">
                <input
                  id="inputNombreUsuario"
                  name="nombre"
                  type="text"
                  onChange={(e) => handlerDatosNuevaCategoria(e)}
                  value={nuevaCategoria?.nombre}
                />
              </div>
            </div>


          </div>
        </div>

        <hr />

      </form>
    </div>
  );
};