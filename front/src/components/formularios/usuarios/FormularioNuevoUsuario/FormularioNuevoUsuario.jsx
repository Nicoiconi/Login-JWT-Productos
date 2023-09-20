import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { crearUsuario } from "../../../../redux/actions/usuarioActions/usuarioActions";

export default function FormularioNuevoUsuario(props) {

  const dispatch = useDispatch();

  const [nuevoUsuario, setNuevoUsuario] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  // console.log(usuarioLogeado);

  useEffect(() => {
    setNuevoUsuario({
      ...nuevoUsuario,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);
  // console.log(nuevoUsuario);

  function handlerCredenciales(e) {
    const { name, value } = e.target;

    setNuevoUsuario({
      ...nuevoUsuario,
      [name]: value
    });
  };
  console.log(nuevoUsuario);

  function handleSubmit(e) {
    // e.preventDefault();
    dispatch(crearUsuario(nuevoUsuario));
  };

  return (
    <div class="container-fluid text-center">
      <form onSubmit={(e) => handleSubmit(e)}>


        <div class="row">
          <div class="col-4">
            <h5>Nuevo Anillo</h5>
          </div>
          <div class="col">
            {
              nuevoUsuario?.nombre && nuevoUsuario?.acc && nuevoUsuario?.pass
                ? <button type="submit">CREAR</button>
                : "Campos requeridos: Nombre, Usuario, Contaseña"
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
                  onChange={(e) => handlerCredenciales(e)}
                  value={nuevoUsuario?.nombre}
                />
              </div>
            </div>

            <hr />

            <div class="row">
              <div class="col-3">
                <label htmlFor="inputAcc">
                  usuario
                </label>
              </div>
              <div class="col">
                <input
                  id="inputAcc"
                  name="accNuevoUsuario"
                  type="text"
                  onChange={(e) => handlerCredenciales(e)}
                  value={nuevoUsuario?.accNuevoUsuario}
                />
              </div>
            </div>

            <hr />

            <div class="row">
              <div class="col-3">
                <label htmlFor="inputPass">
                  contraseña
                </label>
              </div>
              <div class="col">
                <input
                  id="inputPass"
                  name="pass"
                  type="password"
                  // type="text"
                  onChange={(e) => handlerCredenciales(e)}
                  value={nuevoUsuario?.pass}
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