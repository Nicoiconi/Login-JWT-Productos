import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { editarCategoria } from "../../../../redux/actions/categoriasActions/categoriasActions";

export default function FormularioEditarCategoria(props) {

  const { setSwitchHabilitarEdicion } = props;

  const { id } = useParams();

  const dispatch = useDispatch();

  const [categoriaEditada, setCategoriaEditada] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCategoriaEditada({
      ...categoriaEditada,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handleCambio(e) {
    const { name, value } = e.target;
    setCategoriaEditada({
      ...categoriaEditada,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarCategoria(categoriaEditada, id));
    setSwitchHabilitarEdicion(false);
  };

  return (
    <div class="container-fluid text-center d-flex align-item-center justify-content-center">
      <form onSubmit={(e) => handleSubmit(e)}>

        <div class="row">
          {
            categoriaEditada?.nombre
              ? <div class="col">
                <button type="submit">EDITAR</button>
              </div>
              : "Campos requeridos: Nombre"
          }
        </div>

        <hr />

        <div class="row">
          <div class="col">
            <label
              for="inputNombre"
              class="form-label"
            >
              Nombre
            </label>
            <input
              value={categoriaEditada?.nombre}
              onChange={(e) => handleCambio(e)}
              name="nombre"
              type="text"
              class="form-control"
              id="inputNombre"
              placeholder="Nombre"
            />
          </div>
        </div>

        <hr />
      </form>
    </div>
  );
};