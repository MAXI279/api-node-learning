const { Router } = require('express')
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')

const router = Router()

router.get('/', [
    validarJWT
], getMedicos)

router.post('/',[
    validarJWT,
    check('nombre', 'El medico debe poseer un nombre').notEmpty(),
    check('hospital', 'Debe especificar un hospital id para el medico').isMongoId(),
    validarCampos
], crearMedico );

router.put('/:id', [
    validarJWT,
    check('nombre', 'El medico debe poseer un nombre').notEmpty(),
    check('hospital', 'Debe especificar un hospital id para el medico').isMongoId(),
    validarCampos
], actualizarMedico);

router.delete('/:id', [
    validarJWT
], borrarMedico);

module.exports = router