//modelo de datos o equema para los datos de usuario.
//Tenemos que crear un archivo diferente por cada modelo de datos que tenga nuestra alicación (usuarios, productos, ventas, etc...). Los archivos de los modelos de datos estarán en la carpeta 'models'.

const mongoose = require('mongoose'); // solicitamos el módulo 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', userSchema); //exportamos el modelo de User.