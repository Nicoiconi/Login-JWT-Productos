import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { buscarCategorias, crearCategoria } from "../../../../redux/actions/categoriasActions/categoriasActions";
import { crearProducto } from "../../../../redux/actions/productosActions/productosActions";

export default function FormularioNuevoProducto() {

  const dispatch = useDispatch();

  const [nuevoProducto, setNuevoProducto] = useState();
  const [credenciales, setCredenciales] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  // console.log(usuarioLogeado);
  const categorias = useSelector(state => state.categorias.todasCategorias);

  useEffect(() => {
    setNuevoProducto({
      ...nuevoProducto,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);
  // console.log(nuevoProducto);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);

  function handlerDatosNuevoProducto(e) {
    const { name, value } = e.target;

    setNuevoProducto({
      ...nuevoProducto,
      [name]: value
    });
  };
  // console.log(nuevoProducto);

  function handleBuscarCategorias() {
    dispatch(buscarCategorias(credenciales));
  }

  function handleSubmit(e) {
    // e.preventDefault();
    dispatch(crearProducto(nuevoProducto));
  };

  return (
    <div class="container-fluid text-center">
      <form onSubmit={(e) => handleSubmit(e)}>


        <div class="row">
          <div class="col-4">
            <h5>Nuevo Producto</h5>
          </div>
          <div class="col">
            {
              nuevoProducto?.nombre
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
                  onChange={(e) => handlerDatosNuevoProducto(e)}
                  value={nuevoProducto?.nombre}
                />
              </div>
            </div>


          </div>

          {/*  */}

          <div class="col">

            <div class="row">

              <div class="col">
                Categoria
              </div>

              <div class="col">
                <button
                  onClick={() => handleBuscarCategorias()}
                >
                  Buscar
                </button>
              </div>

            </div>

            <hr />

            {
              categorias?.map(c => {
                return (
                  <div class="row">

                    <div class="row">

                      <div class="col">
                        <input
                          type="checkbox"
                          name="categoria"
                          value={c?._id}
                          onChange={(e) => handlerDatosNuevoProducto(e)}
                          id={c?._id}
                        />
                        {c?.nombre}
                      </div>

                    </div>

                  </div>
                )
              })
            }

          </div>

        </div>

        <hr />

      </form>
    </div>
  );
};