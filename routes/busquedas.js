/*
* PATH: 'api/todo/:busqueda'
*/

const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getTodo, getBusquedaColeccion } = require('../controllers/busquedas')

const router = Router();

router.get('/:busqueda', [
    validarJWT
], getTodo);

router.get('/:tabla/:busqueda', [
    validarJWT
], getBusquedaColeccion);

module.exports = router