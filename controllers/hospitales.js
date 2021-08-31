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

    try {
        const { nombre } = req.body
        const hospitalDB = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'No encontrado'
            })
        }

        if(nombre !== hospitalDB.nombre){
            const hospitalDB = await Hospital.findOne({ nombre });
        }

        res.status(200).json({
            ok: true,
            msg: 'actualizarHospital'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente.'
        })
    }
}

const borrarHospital = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'borrarHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}