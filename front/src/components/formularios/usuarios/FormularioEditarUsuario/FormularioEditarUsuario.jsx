import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editarUsuario } from "../../../../redux/actions/usuarioActions/usuarioActions";
import { buscarCategorias } from "../../../../redux/actions/categoriasActions/categoriasActions";

export default function FormularioEditarUsuario(props) {

  const { setSwitchHabilitarEdicion } = props;

  const { id } = useParams();

  const dispatch = useDispatch();

  const [usuarioEditado, setUsuarioEditado] = useState();
  const [credenciales, setCredenciales] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  const categorias = useSelector(state => state.categorias.todasCategorias);

  useEffect(() => {
    setUsuarioEditado({
      ...usuarioEditado,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    })
  }, []);

  function handleCambio(e) {
    const { name, value } = e.target;
    setUsuarioEditado({
      ...usuarioEditado,
      [name]: value
    });
  };

  function handleBuscarCategorias() {
    dispatch(buscarCategorias(credenciales));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarUsuario(usuarioEditado, id));
    setSwitchHabilitarEdicion(false);
  };

  return (
    <div class="container-fluid text-center d-flex justify-content-center align-items-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* <div class="row"> */}

        <div class="row">
          {
            usuarioEditado?.passNueva !== usuarioEditado?.repetirPassNueva
              ? "La nueva contraseña no coincide"
              : !usuarioEditado?.passActual
                ? "Falta la contraseña actual"
                : <div class="col">
                  <button type="submit">EDITAR</button>
                </div>
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
              value={usuarioEditado?.nombre}
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

        <div class="col">
          <label
            for="inputAcc"
            class="form-label"
          >
            Nueva Acc
          </label>
          <input
            value={usuarioEditado?.nuevaAcc}
            onChange={(e) => handleCambio(e)}
            name="nuevaAcc"
            type="text"
            class="form-control"
            id="inputAcc"
            placeholder="Acc"
          />
        </div>

        <div class="col">
          <label
            for="inputPassActual"
            class="form-label"
          >
            Contaseña actual
          </label>
          <input
            value={usuarioEditado?.passActual}
            onChange={(e) => handleCambio(e)}
            name="passActual"
            type="password"
            class="form-control"
            id="inputPassActual"
            placeholder="Password"
          />
        </div>

        <div class="col">
          <label
            for="inputPassNueva"
            class="form-label"
          >
            Nueva contraseña
          </label>
          <input
            value={usuarioEditado?.passNueva}
            onChange={(e) => handleCambio(e)}
            name="passNueva"
            type="password"
            class="form-control"
            id="inputPassNueva"
            placeholder="Password"
          />
        </div>

        <div class="col">
          <label
            for="inputPassRepetirNueva"
            class="form-label"
          >
            Repetir nueva contraseña
          </label>
          <input
            value={usuarioEditado?.repetirPassNueva}
            onChange={(e) => handleCambio(e)}
            name="repetirPassNueva"
            type="password"
            class="form-control"
            id="inputPassRepetirNueva"
            placeholder="Password"
          />
        </div>


      </form>
    </div>
  );
};