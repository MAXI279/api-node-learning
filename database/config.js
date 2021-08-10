const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (error) {
        console.log(error);
        throw new Error('No se puede conectar a la base de datos')
    }
}

module.exports = {
    dbConnection
}