const path = require('path')
const Hospital = require('../models/hospital')
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const fs = require('fs')


const borrarArchivo = (path) => {
    fs.existsSync(path) ? fs.unlinkSync(path) : console.log('Imagen ' + path + ' no existia')
}

const actualizarImagen = async (id, tipo, nombreArchivo) => {

    // eslint-disable-next-line no-undef
    const pathArchivos = path.join(__dirname, '../uploads/', tipo, '/')

    const colecciones = {
        'usuarios': Usuario,
        'medicos': Medico,
        'hospitales': Hospital
    }

    const coleccion = await colecciones[tipo].findById(id)

    if(!coleccion){
        console.log('Coleccion no encontrada')
        return false
    }
    //elimino imagen actual
    const pathViejo = `${pathArchivos}${coleccion.img}`
    borrarArchivo(pathViejo)

    //actualizo img bd
    coleccion.img = nombreArchivo
    await coleccion.save()
    return true

}

module.exports = actualizarImagen