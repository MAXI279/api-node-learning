const { response } = require('express')
const Hospital = require('../models/hospital')


const getHospitales = async (req, res = response) => {

    try {

        const hospitales = await Hospital.find({});

        res.status(200).json({
            ok: true,
            hospitales: hospitales
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

const crearHospital = async (req, res = response) => {

    try {
        const usuarioCreadorId = req.uid

        const hospital = new Hospital({
            usuario: usuarioCreadorId,
            ...req.body
        })

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

const actualizarHospital = async (req, res = response) => {

    const { id } = req.params;
    const usuario = req.uid;

    try {

        const hospitalDB = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'No encontrado'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true, useFindAndModify: false })

        res.status(200).json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

const borrarHospital = async (req, res = response) => {
    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'No encontrado'
            })
        }

        await Hospital.findByIdAndDelete(id)

        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado!'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}