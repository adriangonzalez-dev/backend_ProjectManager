const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.CONNECTION_DB)

        console.log('DB Online')

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConnection
}