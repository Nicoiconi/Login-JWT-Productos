require("dotenv").config();
const { Router } = require("express");
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const esquemaUsuarios = require("../../esquemas/EsquemaUsuarios/EsquemaUsuarios");
const crearToken = require("../../util/crearToken/crearToken");
const { hashData, verifyHashedData } = require("../../util/hashData/hashData");

const router = Router();
const { TOKEN_KEY } = process.env;


router.post("/", async (req, res) => {
  try {
    const { acc, token, pass, nombre, accNuevoUsuario } = req.body;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          const missingFields = [];

          if (!accNuevoUsuario) {
            missingFields.push("acc");
          };

          if (!pass) {
            missingFields.push("pass");
          };

          if (!nombre) {
            missingFields.push("nombre");
          };

          if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan los siguientes campos requeridos: ${missingFields.join(", ")}` });
          };

          const existeUsuario = await esquemaUsuarios.findOne({ accNuevoUsuario });
          if (existeUsuario) {
            return res.status(409).json({ error: "Ya existe un usuario con esa acc." });
            // 409 conflicto
          };

          const hashedPass = await hashData(pass);

          const usuario = await esquemaUsuarios.create({
            acc: accNuevoUsuario,
            pass: hashedPass,
            nombre
          });

          const nuevoUsuario = await esquemaUsuarios.findById(usuario._id);
          // console.log(nuevoAnillo);
          res.status(200).json({ mensaje: 'Usuario creado exitosamente', objeto: nuevoUsuario });
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "Error al obtener los usuarios" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
      // console.log(verificarUsuario);

      if (!verificarUsuario) {
        res.status(404).json({ error: "Usuario no autorizado" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        // console.log(decodedToken);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "Usuario no autorizado" });
        } else {

          // let consulta = {};

          // if (acc) consulta.acc = acc;

          // if (token) consulta.token = token;

          // controlar que funcione correctamente. controlado? NO
          const todosUsuarios = await esquemaUsuarios.find();
          res.send(todosUsuarios);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { acc, pass } = req.body;
    // console.log(req.body);

    if (!(acc && pass)) {
      res.status(400).send({ error: "Faltan datos mostro" });
    } else {
      const existeUsuario = await esquemaUsuarios.findOne({ acc });

      if (!existeUsuario) {
        res.status(404).send({ error: "Credenciales no válidas" });
      } else {
        let credenciales = {};

        credenciales.acc = acc;

        const coincidePass = await verifyHashedData(pass, existeUsuario.pass);

        if (!coincidePass) {
          res.status(404).send({ error: "credenciales no válidas" });

        } else {
          credenciales.pass = existeUsuario.pass;
          const usuario = await esquemaUsuarios.findOne(credenciales);

          const tokenData = {
            acc: usuario.acc,
            pass: usuario.pass
          };

          const nuevoToken = await crearToken(tokenData);

          if (!nuevoToken) {
            res.status(404).send({ error: "Error inesperado" });
          } else {

            const usuarioActualizado = await esquemaUsuarios.updateOne({ _id: usuario._id }, { $set: { token: nuevoToken } }, { upsert: true })
            // console.log(usuarioActualizado);

            if (usuarioActualizado.nModified === 0) {
              res.status(404).send({ error: "error inesperado" });
            } else {
              const usuarioConToken = await esquemaUsuarios.findOne(credenciales);
              if (!usuarioConToken) {
                res.status(404).send({ error: "error inesperado" });
              } else {
                res.status(200).json({ mensaje: 'Usuario logeado exitosamente', objeto: usuarioConToken });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al logearse" });
  }
});

router.post("/verificar-token", async (req, res) => {
  try {
    const { acc, token } = req.body;

    if (!(acc && token)) {
      res.send(false);
    } else {
      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
      // console.log(verificarUsuario);

      if (!verificarUsuario) {
        res.send(false);
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        // console.log(decodedToken);

        if (decodedToken.expiredAt) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al verificar el token" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    } else {


      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
      // console.log(verificarUsuario);

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        // console.log(decodedToken);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          const usuarioPorId = await esquemaUsuarios.findById(id);
          res.send(usuarioPorId);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, passActual, nuevaAcc, passNueva, acc, token } = req.body;
    console.log(1, req.body);

    if (!(acc && token && passActual)) {
      res.status(404).json({ error: "Error al obtener los usuarios" });
    };
    const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
    // console.log(verificarUsuario);

    if (!verificarUsuario) {
      res.status(404).json({ error: "Usuario no autorizado" });
    } else {
      // validar token
      const decodedToken = jwt.verify(token, TOKEN_KEY);
      // console.log(decodedToken);

      if (decodedToken.expiredAt) {
        res.status(404).json({ error: "Usuario no autorizado" });

      } else {

        const usuarioAModificar = await esquemaUsuarios.findById(id);

        const coincidePass = await verifyHashedData(passActual, usuarioAModificar.pass);
        console.log(2, coincidePass);
        
        if (!coincidePass) {
          res.status(404).send({ error: "credenciales no válidas" });
        } else {

          let updateFields = {};
          console.log(3, updateFields);

          if (passNueva) {
            const hashedNuevaPass = await hashData(passNueva);
            updateFields.pass = hashedNuevaPass;
          };
          console.log(3, passNueva);

          if (nuevaAcc) {
            const existeUsuario = await esquemaUsuarios.findOne({ acc: nuevaAcc });
            console.log(3, existeUsuario);
            if (existeUsuario) {
              return res.status(409).json({ error: "Ya existe un usuario con esa acc." });
            };
            updateFields.acc = nuevaAcc;
            console.log(3, updateFields);

          };
          console.log(3, updateFields);

          if (nombre) {
            updateFields.nombre = nombre;
          };

          updateFields.modified_at = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY');;
          console.log(3, updateFields);

          const usuarioModificado = await esquemaUsuarios.updateOne({ _id: id }, { $set: updateFields });
          console.log(4, usuarioModificado);

          if (usuarioModificado.nModified === 0) {
            res.status(404).send({ error: "No se pudo modificar el usuario" });
          } else {
            const usuarioActualizado = await esquemaUsuarios.findOne({ _id: id });
            // console.log(usuarioActualizado);
            res.status(200).json({ mensaje: 'Usuario editado exitosamente', objeto: usuarioActualizado });
          };
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al editar el usuario" });
  }
});

router.put("/logout/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      acc,
      token
    } = req.body;

    if (!(acc && token)) {
      res.status(500).json({ error: "Error al deslogearse" });
    } else {
      const usuarioADeslogear = await esquemaUsuarios.findOne({ acc, token });
      // console.log(usuarioADeslogear);

      if (!usuarioADeslogear) {
        res.status(500).json({ error: "El usuario ya esta deslogeado" });
      } else {
        const usuarioDeslogeado = await esquemaUsuarios.updateOne({ _id: id }, { token: null });

        if (usuarioDeslogeado.nModified === 0) {
          res.status(404).send({ error: "No se pudo modificar el usuario" });
        } else {
          res.status(200).send("Usuario deslogeado");
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al deslogearse" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "" });
    };

    const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });
    // console.log(verificarUsuario);

    if (!verificarUsuario) {
      res.status(404).json({ error: "" });
    } else {
      // validar token
      const decodedToken = jwt.verify(token, TOKEN_KEY);
      // console.log(decodedToken);

      if (decodedToken.expiredAt) {
        res.status(404).json({ error: "" });
      } else {

        await esquemaUsuarios.deleteOne({ _id: id });
        res.status(200).send("Usuario borrado exitosamente");
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al eliominar el usuario" });
  }
});


module.exports = router;
