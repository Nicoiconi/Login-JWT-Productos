import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { usuariosSlice } from "../slices/usuariosSlice/usuariosSlice";
import { categoriasSlice } from "../slices/categoriasSlice/categoriasSlice";
import { productosSlice } from "../slices/productosSlice/productosSlice";


const persistConfigUsuarios = {
  key: "rootUsuarios",
  storage,
  blacklist: ["auth"],
};

const persistConfigProductos = {
  key: "rootProductos",
  storage,
  blacklist: ["auth"],
};

const persistConfigCategorias = {
  key: "rootCategorias",
  storage,
  blacklist: ["auth"],
};


const persistedUsuarios = persistReducer(persistConfigUsuarios, usuariosSlice.reducer);
const persistedProductos = persistReducer(persistConfigProductos, productosSlice.reducer);
const persistedCategorias = persistReducer(persistConfigCategorias, categoriasSlice.reducer);


export const store = configureStore({
  reducer: {
    usuarios: persistedUsuarios,
    productos: persistedProductos,
    categorias: persistedCategorias,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
