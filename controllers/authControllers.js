const { request, response } = require("express");
const createError = require('http-errors');
const User = require('../models/User');
const { randomTokenGenerator } = require("../helpers");

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
                msg: 'Usuario logged'
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
        try {
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
        try {
            return res.status(201).json({
                ok: true,
                msg: 'send token ok'
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
        try {
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
        try {
            return res.status(201).json({
                ok: true,
                msg: 'password changed ok'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'password not changed'
            })
        }
    }
}