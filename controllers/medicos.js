const { response } = require('express')
const Medico = require('../models/medico')

const getMedicos = async (req, res = response) => {

    try {
        const medicos = await Medico.find()
                                    .populate('hospital', 'nombre')
                                    .populate('usuario', 'nombre img')

        res.status(200).json({
            ok: true,
            medicos: medicos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

const crearMedico = async (req, res = response) => {

    const idUsuarioCreador = req.uid
    const { nombre, hospital } = req.body
    try {

        const medico = new Medico({ usuario: idUsuarioCreador, nombre, hospital })

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

const actualizarMedico = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'borrarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}