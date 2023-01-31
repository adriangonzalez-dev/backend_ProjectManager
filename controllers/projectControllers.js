const { request, response } = require("express");

module.exports = {
    findAll: async (req = request,res = response) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'todos los proyectos'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Hubo un error'
            })
        }
    },
    findById: async (req = request,res = response) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'proyecto por id'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Hubo un error'
            })
        }
    },
    create: async (req = request,res = response) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Proyecto guardado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'usuario not checked'
            })
        }
    },
    update: async (req = request,res = response) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'rpoyecto editado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'token not send'
            })
        }
    },
    projectDelete: async (req = request,res = response) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'proyecto eliminado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'token not valid'
            })
        }
    },
    addColaborator: async (req = request,res = response) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'colaborator added'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'token not valid'
            })
        }
    },
    removeColaborator: async (req = request,res = response) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'delete colaborator'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'token not valid'
            })
        }
    },
}