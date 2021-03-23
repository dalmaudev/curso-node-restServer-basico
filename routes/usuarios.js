
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();


router.get("/", usuariosGet);
router.put("/:id", [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut);
router.post("/",[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria y más de 6 letras o números').isLength({min:6}),
  //check('correo', 'El correo no es válido').isEmail(),

  // lo validaremos contra la bd 
  // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

  //middleware personalizado para validar los campos
  check('correo').custom(emailExiste),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPost);
router.patch("/", usuariosPatch);
router.delete("/:id", [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);

module.exports = router;