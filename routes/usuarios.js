const { Router } = require('express')
const { check } = require('express-validator')
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/', [ validarJWT ], getUsuarios );

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'Contraseña es obligatoria').notEmpty(),
    validarCampos
], crearUsuario );

router.put('/:id', [
    validarJWT,
    validarCampos
], actualizarUsuario);

router.delete('/:id', [
    validarJWT
], borrarUsuario);

module.exports = router;