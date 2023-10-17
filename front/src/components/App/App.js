import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./App.css";
import verificarToken from '../../utils/verificarToken';
import Inicio from '../vistas/Inicio/Inicio';
import BarraLogIn from '../barras/BarraLogIn/BarraLogIn';
import VistaLogIn from '../vistas/usuarios/VistaLogIn/VistaLogIn';
import VistaTodosUsuarios from '../vistas/usuarios/VistaTodosUsuarios/VistaTodosUsuarios';
import VistaUsuarioIndividual from '../vistas/usuarios/VistaUsuarioIndividual/VistaUsuarioIndividual';
import VistaNuevoUsuario from '../vistas/usuarios/VistaNuevoUsuario/VistaNuevoUsuario';
import VistaNuevaCategoria from '../vistas/categorias/VistaNuevaCategoria/VistaNuevaCategoria';
import VistaTodasCategorias from '../vistas/categorias/VistaTodasCategorias/VistaTodasCategorias';
import VistaCategoriaIndividual from '../vistas/categorias/VistaCategoriaIndividual/VistaCategoriaIndividual';
import VistaNuevoProducto from '../vistas/productos/VistaNuevoProducto/VistaNuevoProducto';
import VistaProductoIndividual from '../vistas/productos/VistaProductoIndividual/VistaProductoIndividual';
import VistaTodosProductos from '../vistas/productos/VistaTodosProductos/VistaTodosProductos';


function App() {

  const [tokenVerificado, setTokenVerificado] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    async function verificarUsuario() {
      try {

        const tokenVerificado = await verificarToken(usuarioLogeado);

        if (tokenVerificado === true) {
          setTokenVerificado(true);
          console.log("Token verificado correctamente");
        } else {
          setTokenVerificado(false);
          console.log("Token inválido")
        }
      } catch (error) {
        // console.log(error);
      }
    }
    verificarUsuario();
  }, [tokenVerificado, usuarioLogeado]);

  return (
    <div class="container-fluid text-center App">
      <Router>

        <Route path='/' component={BarraLogIn} />


        <hr />

        {
          !tokenVerificado
            ? <VistaLogIn />
            : <div>
              <Switch>

                <Route exact path='/' component={Inicio} />

                <Route exact path='/nuevo-usuario' component={VistaNuevoUsuario} />
                <Route exact path='/nuevo-producto' component={VistaNuevoProducto} />
                <Route exact path='/nueva-categoria' component={VistaNuevaCategoria} />

                <Route exact path='/todos-usuarios' component={VistaTodosUsuarios} />
                <Route exact path='/todos-productos' component={VistaTodosProductos} />
                <Route exact path='/todas-categorias' component={VistaTodasCategorias} />

                <Route exact path='/usuarios/:id' component={VistaUsuarioIndividual} />
                <Route exact path='/productos/:id' component={VistaProductoIndividual} />
                <Route exact path='/categorias/:id' component={VistaCategoriaIndividual} />

              </Switch>

            </div >
        }

      </Router>
    </div >
  );
}

export default App;
