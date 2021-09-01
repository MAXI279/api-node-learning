const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const loginGoogle = async (req, res = response) => {

    const googleToken = req.body.token

    try {

        const { name, email, picture } = await googleVerify(googleToken)

        //verificar si usuario ya existe en DB
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                    nombre: name,
                    email,
                    password: '@@@',
                    img: picture,
                    google: true,
                    role: 'USER_ROLE'
            })
        } else{
            usuario = usuarioDB
            usuario.google = true;
            usuario.password = '@@@'
        }

        await usuario.save();

        const token = await generarJWT(usuario.id)
        res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado, reintente'
        })
    }
}

module.exports = {
    login,
    loginGoogle
}