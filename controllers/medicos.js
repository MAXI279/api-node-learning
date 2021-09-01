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

const actualizarMedico = async (req, res = response) => {

    const { id } = req.params;
    const usuario = req.uid;

    try {

        const medicoDB = await Medico.findById(id);

        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No encontrado'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true, useFindAndModify: false })

        res.status(200).json({
            ok: true,
            msg: 'Medico Actualizado!',
            medico: medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);

        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No encontrado'
            })
        }

        await Medico.findByIdAndDelete(id)

        res.status(200).json({
            ok: true,
            msg: 'Medico eliminado!'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}