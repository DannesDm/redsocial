'use strict'

var path = require('path');
var fs = require('fs');
var jwt = require('../services/jwt');
var Group = require('../models/group');
var User = require('../models/user');

function init(req, res) {

    res.status(200).send({ message: "Controlador de grupo" });


}

function saveGroup(req, res) {
    var params = req.body;
    var group = new Group();

    if (params.groupname && params.grouptext) {
        group.groupname = params.groupname;
        group.grouptext = params.grouptext;
        group.users = req.user.sub;



    }


    group.save((err, groupStored) => {

        if (err) return res.status(500).send({ message: 'Error al guardar el grupo' });

        if (!groupStored)
            return res.status(404).send({ message: 'el grupo no ha sido guardad' });

        return res.status(200).send({ grupo: groupStored });
    });


}

//Obtener el listadp de grupo en los que se encuentra un usuario
function getGroupsUser(req, res) {

    //guarda el id del usuario
    var identity_user_id = req.user.sub;

    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 5;

    Group.find({ users: identity_user_id }).paginate(page, itemsPerPage, (err, groups, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!groups) return res.status(404).send({ message: 'No hay grupos disponibles' });

        return res.status(200).send({
            groups,
            items_per_page: itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });

    });


}


//Obtener el listado de grupos
function getGroups(req, res) {
    var identity_user_id = req.user.sub;

    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 5;

    Group.find().paginate(page, itemsPerPage, (err, groups, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!groups) return res.status(404).send({ message: 'No hay grupos disponibles' });

        return res.status(200).send({
            groups,
            items_per_page: itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });

    });


}



//Obtiene los usuarios que estan en este grupo con el populate
function getMyGroups(req, res) {
    var groupId = req.params.id;


    Group.findOne({ _id: groupId }).populate('user users').exec(function(err, group) {
        if (err) return res.status(404).send({ message: 'No existe ningun usuario en el grupo' });


        return res.status(200).send(group);

    });
}



module.exports = {

    init,
    saveGroup,
    getGroupsUser,
    getGroups,
    getMyGroups


}