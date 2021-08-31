const { response } = require('express')
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')

    try {

        const usuarios = await Usuario.find({ nombre: regex })
        const hospitales = await Hospital.find({ nombre: regex })
        const medicos = await Medico.find({ nombre: regex })

        res.status(200).json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente'
        })
    }
}

const getBusquedaColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')

    try {
/*
        const colecciones = {
            'medicos': Medico,
            'hospitales': Hospital,
            'usuarios': Usuario
        }

        if(!colecciones[tabla]){
            return res.status(400).json({
                ok: false,
                msg: 'La coleccion ingresada no es valida'
            })
        }

        const resultados = await colecciones[tabla].find({ nombre: regex })
*/
        let data = [];

        switch ( tabla ) {
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');
            break;

            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                                        .populate('usuario', 'nombre img');
            break;

            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
            break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                });
        }
        res.status(200).json({
            ok: true,
            resultados: data
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, reintente'
        })
    }
}

module.exports = {
    getTodo,
    getBusquedaColeccion
}