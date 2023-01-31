const { request, response } = require("express");

module.exports = {
    findAll: async (req = request,res = response) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'todas las tareas'
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
                msg: 'tarea por id'
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
                msg: 'tarea guardada'
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
                msg: 'proyecto actualizado'
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
                msg: 'tarea eliminada'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'token not valid'
            })
        }
    },
    changeState: async (req = request,res = response) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'tarea cpmletada'
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