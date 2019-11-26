//Cargar Express Servidor
'use strict'

//Exprees para servicios HTTP en ajax
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas luego de esto poner la ruta alternativa en //rutas

var user_routes = require('./routes/user');
var follow_routes = require('./routes/follow');
var message_routes = require('./routes/message');
var publication_routes = require('./routes/publication');
var group_routes = require('./routes/group');


//cargar middlewares
//metodo que se ejecute antes de que llege al controlador
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cors

// configurar cabeceras http para metodos del angular
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//RUTAS
//middewale se ejecuta antes del controlador

app.use('/api', user_routes);
app.use('/api', follow_routes);
app.use('/api', message_routes);
app.use('/api', publication_routes);
app.use('/api', group_routes);

//exportar app
module.exports = app;