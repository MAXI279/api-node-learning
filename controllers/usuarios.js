const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async (req, res) => {

        console.log('/api/usuarios - GET')
        const desde = Number(req.query.desde) || 0

        const [ usuarios, total ] = await Promise.all([
            Usuario.find({}, 'nombre email role google img')
                                      .skip( desde )
                                      .limit(5),
            Usuario.countDocuments()
        ])

        res.status(200).json({
             ok: true,
             msg: "Listado Usuarios",
             usuarios: usuarios,
             total,
             uid_req: req.uid
        })

}

const crearUsuario = async (req, res = response) => {

    console.log('/api/usuarios - POST')

    const {email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado"
            })
        }

        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()

        const token = await generarJWT(usuario.id)

        res.status(200).json({
            ok: true,
            usuario: usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        })
    }
}

const actualizarUsuario = async (req, res = response) => {

    try {
        // eslint-disable-next-line no-unused-vars
        const { password, email, ...campos } = req.body;
        const id = req.params.id;
        const usuarioDB = await Usuario.findById(id);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No encontrado'
            })
        }

        if(email !== usuarioDB.email){
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "El correo ya está registrado"
                })
            }
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, ver logs'
        })
    }

}

const borrarUsuario = async (req, res = response) => {

    try {
        const id = req.params.id;
        const usuarioDB = await Usuario.findById(id);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario inexistente. Verifique información'
            })
        }

        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado Exitosamente!',
            usuario: usuarioEliminado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}