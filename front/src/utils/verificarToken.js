import { deslogearUsuario, verificarTokenUsuario } from "../redux/actions/usuarioActions/usuarioActions";
import { setResetearEstadoUsuarios } from "../redux/slices/usuariosSlice/usuariosSlice";



export default async function verificarToken(usuarioLogeado) {
  try {
    const tokenVerificado = await verificarTokenUsuario(usuarioLogeado);

    if (tokenVerificado){
      return true;

    } else {
      return async function (dispatch){
        dispatch(deslogearUsuario(usuarioLogeado));

        dispatch(setResetearEstadoUsuarios());

        return false;
      }
    };

  } catch (error) {
    console.error(error);
  };

};