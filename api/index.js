'use strict' /*Permite usar el codigo javascript en nodejs*/

/*Mongoose son los drivers para conectar a la BD*/
var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

/*Cadena de conexion*/

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/RedSocialBD', { useMongoClient: true })
    .then(() => {
        console.log("La conexion se realizo correctamente!");

        //crear servidor

        app.listen(port, () => {
            console.log("Servidor creado en http://localhost:3800");

        });

    })
    .catch(err => console.log(err));