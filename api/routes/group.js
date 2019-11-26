'use strict'

var express = require('express');
var GroupController = require('../controllers/group');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/groups' });

api.get('/init-group', md_auth.ensureAuth, GroupController.init);
api.post('/group', md_auth.ensureAuth, GroupController.saveGroup);
api.get('/groupsusers/:page?', md_auth.ensureAuth, GroupController.getGroupsUser);
api.get('/groups/:page?', md_auth.ensureAuth, GroupController.getGroups);
//api.get('/group/:id', md_auth.ensureAuth, GroupController.obtenerListado);
api.get('/listusers/:id', md_auth.ensureAuth, GroupController.getMyGroups);

module.exports = api;