const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const login = async (req, res = response) => {

    const { email, password } = req.body
    try {
        const usuarioDB = await Usuario.findOne({ email })

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        if(bcrypt.compareSync(password, usuarioDB.password)){
            const token = await generarJWT(usuarioDB.id)
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token
            });
        }else{
            res.status(400).json({
                ok: false,
                msg: 'Contraseña Incorrecta'
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado, reintente'
        })
    }

}

module.exports = {
    login
}