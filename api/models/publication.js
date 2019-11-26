'use strict'
//Para cargar el module de bd y poder trabajar con el modelo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = Schema({

    text: String,
    file: String,
    created_at: String,

    //user variable hace refencia a entidad user
    user: { type: Schema.ObjectId, ref: 'User' }




});

module.exports = mongoose.model('Publication', PublicationSchema);