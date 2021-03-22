const { response } = require("express");

const usuariosGet = (req, res = response) => {
  const { q, nombre = "jhon doe", apikey, page, limit } = req.query;

  res.json({
    msg: "get API - controllador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = (req, res = response) => {
  // como extraer el body
  const { nombre, edad } = req.body;
  res.json({
    msg: "post API - controllador",
    nombre,
    edad,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "put API - controllador",
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controllador",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controllador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
