const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  // Retornamos todos los usuarios con find y los paginamos con limit, transformando a number la string limite, con desde le decimos usando skip en que registro empieza a mostrar. {estado: true} se lo pasamos ya que no eliminamos los registros de la bd, solo los pasamos a estado: false
  // const usuarios = await Usuario.find({ estado: true })
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments({ estado: true });

  // Coleccion de promesas y ejecuta de manera simultanea todas las promesas no hay que esperar
  // total y usuarios es una desestructuracion de un array que nos mostrara por orden las promesas

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

//
const usuariosPost = async (req, res = response) => {
  // como extraer el body entero, si queremos podemos desestructurar las opciones {nombre, edad}
  // const body = req.body;
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la password
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en db
  await usuario.save();

  res.json({ usuario });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra la bd
  if (password) {
    //Encriptar la password
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controllador",
  });
};

const usuariosDelete = async(req, res = response) => {
  const { id } = req.params;

  // borrado fisico - total (quen o usaremos)
  // const usuario = await Usuario.findByIdAndDelete(id);
  
  // para eliminarlo pasamos el estado a false
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


  res.json({
    usuario
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
