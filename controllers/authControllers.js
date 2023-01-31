const { request, response } = require("express");
const createError = require('http-errors');
const User = require('../models/User');
const { randomTokenGenerator, jwtGenerator, mailConfirmRegister, forgetPassword } = require("../helpers");

module.exports = {
    register: async (req = request,res = response) => {

        try {
            const {name, email, password} = req.body;
            
            let user = await User.findOne({email})
            if(user){
                throw createError(400,'El email ya se encuentra registrado')
            }
            
            user = new User(req.body);
            user.token = randomTokenGenerator();

            await user.save();
        
            await mailConfirmRegister({
                name: user.name,
                email: user.email,
                token: user.token
            })

            return res.status(201).json({
                ok: true,
                msg: 'Usuario registrado',
                data: user
            });
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Hubo un error'
            })
        }
    },
    login: async (req = request,res = response) => {
        const {email, password} = req.body;

        try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(403).json({
                login: false,
                message: 'Email o contraseña incorrecta'
            })
        }

        if(!user.checked){
            return res.status(403).json({
                login: false,
                message: 'Tu cuenta no ha sido verificada'
            })
        }

        if(!await user.checkedPassword(password)){
            return res.status(403).json({
                login: false,
                message: 'Email o contraseña incorrecta | PASSWORD'
            })
        }

            return res.status(201).json({
                ok: true,
                msg: 'User logged',
                user: {
                    name: user.name,
                    email: user.email,
                    token: jwtGenerator({id: user._id})
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Hubo un error'
            })
        }
    },
    checked: async (req = request,res = response) => {
        const {token} = req.query
        try {
            const user = await User.findOne({token});

            if(!user){
                return res.status(400).json({
                    ok: false,
                    msg: 'Token invalido'
                });
            }

            user.checked = true;
            user.token = '';

            await user.save();

            return res.status(201).json({
                ok: true,
                msg: 'Usuario checked'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'usuario not checked'
            })
        }
    },
    sendToken: async (req = request,res = response) => {
        const {email } = req.body;

        try {
            const user = await User.findOne({email});

            if(!user){
                return res.status(400).json({
                    msg: 'Email incorrecto'
                });
            }

            user.token = randomTokenGenerator();
            user.save();

            //Enviar email para cambio de clave
            await forgetPassword({
                name: user.name,
                email: user.email,
                token: user.token
            })

            return res.status(201).json({
                ok: true,
                msg: `Se ha enviado un correo a ${email}`
            })


        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'token not send'
            })
        }
    },
    verify: async (req = request,res = response) => {
        const {token} = req.query;
        try {
            const user = await User.findOne({token});

            if(!user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Token inválido'
                })
            }
            return res.status(201).json({
                ok: true,
                msg: 'token ok'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'token not valid'
            })
        }
    },
    changePassword: async (req = request,res = response) => {
        const {token} = req.query;
        const {password} = req.body;
        
        try {

            const user = await User.findOne({
                token
            });

            user.password = password;
            user.token = '';

            await user.save();

            return res.status(201).json({
                ok: true,
                msg: 'password changed ok'
            });
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'password not changed'
            })
        }
    }
}