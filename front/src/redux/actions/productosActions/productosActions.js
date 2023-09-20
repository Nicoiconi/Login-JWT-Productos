import axios from "axios";
import { setProductoPorId, setProductos } from "../../slices/productosSlice/productosSlice";


export function buscarProductos(credenciales) {
  return async function (dispatch) {
    try {
      let productos = await axios.get("http://localhost:27017/productos", {
        params: credenciales,
      });
      return dispatch(setProductos(productos.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function buscarProductoPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const producto = await axios.get(`http://localhost:27017/productos/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setProductoPorId(producto.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function editarProducto(payload, id) {
  return async function (dispatch) {
    try {
      const productoEditado = await axios.put(`http://localhost:27017/productos/${id}`, payload);
      return dispatch(setProductoPorId(productoEditado.data.objeto));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function crearProducto(payload) {
  return async function (dispatch) {
    try {
      const nuevaProducto = await axios.post("http://localhost:27017/productos", payload);
      return nuevaProducto;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function borrarProducto(id, credenciales) {
  return async function () {
    try {
      const respuesta = await axios.delete(`http://localhost:27017/productos/${id}`, {
        params: credenciales,
      });
      return respuesta.data;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};