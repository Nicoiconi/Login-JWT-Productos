import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import FormularioEditarProducto from "../../../formularios/productos/FormularioEditarProducto/FormularioEditarProducto";
import { borrarProducto, buscarProductoPorId, buscarProductos } from "../../../../redux/actions/productosActions/productosActions";
import { setProductoPorId } from "../../../../redux/slices/productosSlice/productosSlice";

export default function VistaProductoIndividual() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [credenciales, setCredenciales] = useState();
  const [switchHabilitarEdicion, setSwitchHabilitarEdicion] = useState(false);
  const [switchHabilitarEliminar, setSwitchHabilitarEliminar] = useState(false);

  const producto = useSelector(state => state.productos.productoIndividual);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

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
    dispatch(buscarProductoPorId(id, credenciales));
    dispatch(buscarProductos(credenciales));
  };

  function handleEliminar() {
    dispatch(borrarProducto(id, credenciales));
    dispatch(setProductoPorId(null));
    dispatch(buscarProductos(credenciales));
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
          <Link to="/nuevo-producto" ><button>
            Nuevo Producto
          </button></Link>
        </div>

        <div class="col">
          <Link to="/todos-productos" ><button>
            Productos
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
        <h3>Producto</h3>
      </div>

      {
        !producto
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
              {producto?.nombre} - {producto?.categoria?.nombre}
            </div>

            <hr />

            <div class="col">
              {
                switchHabilitarEdicion
                  ? <FormularioEditarProducto
                    idCategoria={producto?.categoria?._id}
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