import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deslogearUsuario } from "../../../redux/actions/usuarioActions/usuarioActions";
import { setResetearEstadoUsuarios } from "../../../redux/slices/usuariosSlice/usuariosSlice";


export default function BarraLogIn() {

  const dispatch = useDispatch();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  const [switchHabilitarLogOut, setSwitchHabilitarLogOut] = useState(false);

  function switcharHabilitarLogOut() {
    if (switchHabilitarLogOut) setSwitchHabilitarLogOut(false);
    if (!switchHabilitarLogOut) setSwitchHabilitarLogOut(true);
  };

  function handlerBotonLogOut() {
    dispatch(deslogearUsuario(usuarioLogeado));
    dispatch(setResetearEstadoUsuarios());
  };

  return (
    <div class="container-fluid">
      {
        usuarioLogeado
          ? <div>
            <h2>Hola! {usuarioLogeado.nombre}</h2>
            <div>
              {
                !switchHabilitarLogOut
                  ? <div>
                    {"Log out -->"}
                    <input type="checkbox" name="habilitar-edicion" onClick={(e) => switcharHabilitarLogOut(e)} checked={switchHabilitarLogOut} />
                  </div>
                  : <div>
                    <Link to="/"><button
                      onClick={() => handlerBotonLogOut()}
                    >
                      Log Out
                    </button></Link>

                    <input type="checkbox" name="habilitar-edicion" onClick={(e) => switcharHabilitarLogOut(e)} checked={switchHabilitarLogOut} />
                  </div>
              }
            </div>
          </div>
          : <div>
            Bienvenido
          </div>
      }
      {/* <div>
        <Link to="/login">
          LogIn
        </Link>
      </div>
      <div>
        <Link to="/">
          Inicio
        </Link>
      </div> */}
    </div>
  );
};