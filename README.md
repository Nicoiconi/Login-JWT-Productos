Web app usando stack MERN.
MongoDB, Express, React, Node

CRUD:
Usuarios - Productos - Categorias


extras
Usuarios:
  Login con usuario y contraseña. Cada vez que se logea se genera un token (jwt). Todas las solicitudes CRUD se envían con credenciales (usuario y token).

Productos:
  Se puede crear un producto asignandole una categoría. Se puede cambiar la categoría del producto.

La barra superior (BarraLogin) tiene la opción para deslogear el usuario

Instrucciones de uso:

- Instalar dependencias (npm install) en back y front.
- Crear archivo .env en el back con:
  · MONGODB_URI: string para conectar a MongoDB.
  · PORT (no requerido).
  · TOKEN_KEY: un codigo privado para crear el token.
  · TOKEN_EXPIRE_IN: tiempo de expiración para el token (ej: 30m), superado ese tiempo no tendrá más validéz y redigirá al formulario para logearse.
- Para crear un Usuario: 
  · front: comentar la verificación del token en los componentes App y FormularioNuevoUsuario.
  · back: comentar la verificación en las rutasUsuarios.
  · una vez creado un usuario descomentar las verificaciones.


Espero te sirva de algo este código, espero no olvidarme de nada.
Cualquier duda o consulta no dudes en contactarme.