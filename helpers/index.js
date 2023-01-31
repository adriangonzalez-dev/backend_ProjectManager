const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

module.exports = {
    randomTokenGenerator(){
        const random = Math.random().toString(32).substring(2);
        const date = Date.now().toString(32);
        return random + date
    },
    jwtGenerator(payload){
        return jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn : '1h'
            })
    },
    async mailConfirmRegister(data){
        const {name, email, token} = data;
        
        try {
            await transport.sendMail({
                from:'Adrian Gonzalez <adriramone90@gmail.com>',
                to: email,
                subject: 'Confirmá tu registro',
                text: 'Confirma tu cuenta en Project Manager',
                html:`
                <p>Hola ${name}</p>
                <p>Hace click en el siguiente enlace</p>
                <a href="${process.env.URL_FRONTEND}/confirm/${token}">Confirmá tu cuenta</a>`
            })
        } catch (error) {
            console.log(error)
        }
    },
    async forgetPassword(){
        const {name, email, token} = data;
        
        try {
            await transport.sendMail({
                from:'Adrian Gonzalez <adriramone90@gmail.com>',
                to: email,
                subject: 'Reestablece tu contraseña',
                text: 'Reestablece tu contraseña en Project Manager',
                html:`
                <p>Hola ${name}</p>
                <p>Hace click en el siguiente enlace para reestablecer tu contraseña</p>
                <a href="${process.env.URL_FRONTEND}/confirm/${token}">Recupera tu contraseña</a>`
            })
        } catch (error) {
            console.log(error)
        }
    }
}