'use strict'
//rutas para el controlador de usuario
//cargar express
var express = require('express');
var UserController = require('../controllers/user');
//para acceder a get post put delete
var api = express.Router();
//usar el middleware en una ruta
var md_auth = require('../middlewares/authenticated');
//para imagenes de usuarios
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

//cargar rutas para probar en el postman y luego en el frontend de angular
api.get('/home', UserController.home);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);
api.get('/getusers', UserController.getMyUsers);
//api.get('/counters/:id?', md_auth.ensureAuth, UserController.getCounters);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);


module.exports = api;