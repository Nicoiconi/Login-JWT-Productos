require("dotenv").config();
const { Router } = require("express");
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const esquemaCategorias = require("../../esquemas/EsquemaCategorias/EsquemaCategorias");
const esquemaUsuarios = require("../../esquemas/EsquemaUsuarios/EsquemaUsuarios");


const router = Router();
const { TOKEN_KEY } = process.env;


router.post("/", async (req, res) => {
  try {
    const { acc, token, nombre } = req.body;

    if (!(acc && token)) {
      res.status(404).json({ error: "Error" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });

      if (!verificarUsuario) {
        res.status(404).json({ error: "Error" });
      } else {
        // validar token
        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "Error" });
        } else {

          const missingFields = [];

          if (!nombre) {
            missingFields.push("nombre");
          };

          if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan los siguientes campos requeridos: ${missingFields.join(", ")}` });
          };

          const existeCategoria = await esquemaCategorias.findOne({ nombre });
          if (existeCategoria) {
            return res.status(409).json({ error: "Ya existe una categoría con ese nombre." });
            // 409 conflicto
          };

          const categoria = await esquemaCategorias.create({
            nombre
          });

          const nuevaCategoria = await esquemaCategorias.findById(categoria._id);
          res.status(200).json({ mensaje: 'Categoría creada exitosamente', objeto: nuevaCategoria });
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "Error al obtener las categorías" });
    } else {

      const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });

      if (!verificarUsuario) {
        res.status(404).json({ error: "Usuario no autorizado" });
      } else {

        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "Usuario no autorizado" });
        } else {

          const todasCategorias = await esquemaCategorias.find();
          res.send(todasCategorias);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
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

      if (!verificarUsuario) {
        res.status(404).json({ error: "" });
      } else {
        const decodedToken = jwt.verify(token, TOKEN_KEY);

        if (decodedToken.expiredAt) {
          res.status(404).json({ error: "" });
        } else {

          const categoriaPorId = await esquemaCategorias.findById(id);
          res.send(categoriaPorId);
        }
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, acc, token } = req.body;

    if (!(acc && token)) {
      res.status(404).json({ error: "Error al obtener los usuarios" });
    };
    const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });

    if (!verificarUsuario) {
      res.status(404).json({ error: "Usuario no autorizado" });
    } else {
      const decodedToken = jwt.verify(token, TOKEN_KEY);

      if (decodedToken.expiredAt) {
        res.status(404).json({ error: "Usuario no autorizado" });

      } else {

        let updateFields = {};

        if (nombre) {
          updateFields.nombre = nombre;
        };

        updateFields.modified_at = moment().tz('America/Argentina/Buenos_Aires').format('HH:mm:ss - DD/MM/YYYY');;

        const categoriaModificada = await esquemaCategorias.updateOne({ _id: id }, { $set: updateFields });

        if (categoriaModificada.nModified === 0) {
          res.status(404).send({ error: "No se pudo modificar la categoría" });
        } else {
          const categoriaActualizada = await esquemaCategorias.findOne({ _id: id });
          res.status(200).json({ mensaje: 'Categoría editada exitosamente', objeto: categoriaActualizada });
        };
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al editar la categoría" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { acc, token } = req.query;

    if (!(acc && token)) {
      res.status(404).json({ error: "Error" });
    };

    const verificarUsuario = await esquemaUsuarios.findOne({ acc, token });

    if (!verificarUsuario) {
      res.status(404).json({ error: "Error" });
    } else {
      const decodedToken = jwt.verify(token, TOKEN_KEY);

      if (decodedToken.expiredAt) {
        res.status(404).json({ error: "Error" });
      } else {

        await esquemaCategorias.deleteOne({ _id: id });
        res.status(200).send("Categoría eliminada exitosamente");
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error al eliminar la categroría" });
  }
});


module.exports = router;
