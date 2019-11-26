'use strict'

/*mongoose Usa mongodb, se usa Esquemas con sus respectivos atributos */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*Nodejs usa esquemas que son como clases con sus atributps*/
var UserSchema = Schema({
    useridentificacion: String,
    userprimernombre: String,
    usersegundonombre: String,
    userprimerapellido: String,
    usersegundoapellido: String,
    usercorreo: String,
    usersector: String,
    usertelefono: String,
    userpassword: String,
    userrol: String,
    userimagen: String


});
//User es el nombre de la Tabla en la BD
module.exports = mongoose.model('User', UserSchema);