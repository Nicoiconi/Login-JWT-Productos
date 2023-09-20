import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { buscarProductoPorId } from "../../../../redux/actions/productosActions/productosActions";

export default function ListaProductos() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const productos = useSelector(state => state.productos?.todosProductos);
  console.log(productos);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);

  function handlerBuscarPorId(e) {
    dispatch(buscarProductoPorId(e.target.value, credenciales));
  };

  return (
    <div class="container-fluid">

      {
        productos?.map(p => {
          return (
            <div>
              <Link to={`/productos/${p._id}`}>
                <button
                  value={p._id}
                  onClick={(e) => handlerBuscarPorId(e)}
                >
                  {p.nombre} - {p.categoria?.nombre}
                </button>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
};