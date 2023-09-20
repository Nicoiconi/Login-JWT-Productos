import axios from "axios";
import {
  setCategoriaPorId,
  setCategorias,
} from "../../slices/categoriasSlice/categoriasSlice";

export function buscarCategorias(credenciales) {
  return async function (dispatch) {
    try {
      let categorias = await axios.get("http://localhost:27017/categorias", {
        params: credenciales,
      });
      return dispatch(setCategorias(categorias.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function buscarCategoriaPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const categoria = await axios.get(`http://localhost:27017/categorias/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setCategoriaPorId(categoria.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function editarCategoria(payload, id) {
  return async function (dispatch) {
    try {
      const categoriaEditada = await axios.put(`http://localhost:27017/categorias/${id}`, payload);
      return dispatch(setCategoriaPorId(categoriaEditada.data.objeto));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function crearCategoria(payload) {
  return async function (dispatch) {
    try {
      const nuevaCategoria = await axios.post("http://localhost:27017/categorias", payload);
      return nuevaCategoria;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function borrarCategoria(id, credenciales) {
  return async function () {
    try {
      const respuesta = await axios.delete(`http://localhost:27017/categorias/${id}`, {
        params: credenciales,
      });
      return respuesta.data;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};