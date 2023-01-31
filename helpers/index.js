const jwt = require('jsonwebtoken')

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
    }
}