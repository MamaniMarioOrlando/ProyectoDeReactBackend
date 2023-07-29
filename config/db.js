require('dotenv').config();
const mongoose = require('mongoose');
//funcion para lograr la coneccion
//con la Base de datos
const connectDB = async() =>{
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log(connection.connection.port);
        const url = `${connection.connection.host}:${connection.connection.port}`
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB