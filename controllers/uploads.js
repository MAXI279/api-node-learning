const { response } = require('express')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const actualizarImagen = require('../helpers/actualizar-imagen')

const fileUpload = (req, res = response) => {


    const { tipo, id } = req.params

    //validamos tipo existente
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'El tipo ingresado no es valido'
        })
    }
    //valido que haya adjuntado archivo form-data
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No se ha incluido un archivo'
        })
    }
    //valido formato imagen
    const archivoSeparado = req.files.imagen.name.split('.');
    const extensionUploadedFile = archivoSeparado[ archivoSeparado.length - 1 ]
    const formatosAceptados = ['jpg', 'jpeg', 'png']
    if(!formatosAceptados.includes(extensionUploadedFile)){
        return res.status(400).json({
            ok: false,
            msg: 'Formato no aceptado'
        })
    }
    //genero nombre unico uuid
    const nombreArchivo = `${ uuidv4() }.${ extensionUploadedFile }`

    //genero path donde guardar
    // eslint-disable-next-line no-undef
    const pathArchivo = path.join( __dirname, '../uploads/', tipo, nombreArchivo)

    //muevo archivo
    req.files.imagen.mv(pathArchivo, (err) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                ok: false,
                msg: 'Ha ocurrido un error al subir archivo'
            })
        }
        else{
            actualizarImagen( id, tipo, nombreArchivo)
        }
    })
    res.status(200).json({
        ok: true,
        msg: 'file uploaded'
    })

}

const retornaImagen = (req, res = response) => {

    const { tipo, foto } = req.params
    // eslint-disable-next-line no-undef
    const pathImg = path.join(__dirname, '../uploads/', tipo, '/', foto)

    if(fs.existsSync(pathImg)){
        res.sendFile( pathImg )
    }else{
        // eslint-disable-next-line no-undef
        const defaultPathImg = path.join(__dirname, '../uploads/not-found.png')
        res.sendFile( defaultPathImg )
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}