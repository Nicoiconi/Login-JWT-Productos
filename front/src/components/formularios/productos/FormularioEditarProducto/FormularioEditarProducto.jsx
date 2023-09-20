import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { buscarCategorias } from "../../../../redux/actions/categoriasActions/categoriasActions";
import { editarProducto } from "../../../../redux/actions/productosActions/productosActions";

export default function FormularioEditarProducto(props) {

  const { setSwitchHabilitarEdicion, idCategoria } = props;
  console.log(idCategoria);

  const { id } = useParams();
  // console.log(id);

  const dispatch = useDispatch();

  const [productoEditado, setProductoEditadao] = useState();
  const [credenciales, setCredenciales] = useState();
  const [categoriasAMostrar, setCategoriasAMostrar] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  // console.log(usuarioLogeado);
  const categorias = useSelector(state => state.categorias.todasCategorias);

  useEffect(() => {
    setProductoEditadao({
      ...productoEditado,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });

    setCategoriasAMostrar(
      categorias?.filter(c => c._id.toString() !== idCategoria.toString())
    );
  }, []);
  console.log(categoriasAMostrar);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);

  function handleCambio(e) {
    const { name, value } = e.target;
    setProductoEditadao({
      ...productoEditado,
      [name]: value
    });
  };
  console.log(productoEditado);

  function handleBuscarCategorias(e) {
    e.preventDefault();
    dispatch(buscarCategorias(credenciales));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarProducto(productoEditado, id));
    setSwitchHabilitarEdicion(false);
  };

  return (
    <div class="container-fluid text-center d-flex align-item-center justify-content-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* <div class="row"> */}

        <div class="row">
          {
            productoEditado?.nombre || productoEditado?.categoria
              ? <div class="col">
                <button type="submit">EDITAR</button>
              </div>
              : "Campos requeridos: Nombre"
          }
        </div>

        <hr />

        <div class="row">

          <div class="col">

            <div class="row">
              <div class="col">
                <label
                  for="inputNombre"
                  class="form-label"
                >
                  Nombre
                </label>
                <input
                  value={productoEditado?.nombre}
                  onChange={(e) => handleCambio(e)}
                  name="nombre"
                  type="text"
                  class="form-control"
                  id="inputNombre"
                  placeholder="Nombre"
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
                  onClick={(e) => handleBuscarCategorias(e)}
                >
                  Buscar
                </button>
              </div>

            </div>

            <hr />

            {
              categoriasAMostrar?.map(c => {
                return (
                  <div class="row">

                    <div class="row">

                      <div class="col">
                        <input
                          type="checkbox"
                          name="categoria"
                          value={c?._id}
                          onChange={(e) => handleCambio(e)}
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