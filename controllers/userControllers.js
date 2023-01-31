const { request, response } = require("express");

module.exports = {
    profile: (req=request, res=response) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'user profile'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'user profile error'
            })
        }
    }
}