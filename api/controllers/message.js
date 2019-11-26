'use strict' //usa javascript de nodejs

//dependencia moment para fechas de mensajes
var moment = require('moment');
//para paginar los mensajes
var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/user');

var Message = require('../models/message');

function probando(req, res) {

    res.status(200).send({ message: 'Probando mensaje privados' });
}

function saveMessage(req, res) {
    var params = req.body;


    if (!params.text || !params.receiver) return res.status(200).send({ message: 'Enviar todos los datos necesarios' });

    var message = new Message();
    message.viewed = 'false';
    message.emitter = req.user.sub;
    message.receiver = params.receiver;
    message.text = params.text;
    message.created_at = moment().unix();


    message.save((err, messageStored) => {


        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!messageStored) return res.status(500).send({ message: 'Error al enviar el mensaje' });

        return res.status(200).send({ message: messageStored });

    });

}

//listado paginado de mensaje recibidos
function getReceivedMessages(req, res) {
    var userId = req.user.sub;

    var page = 1;

    if (req.params.page) {
        page = req.params.page;

    }

    var itemsPerPage = 4;

    Message.find({ receiver: userId }).populate('emitter', 'useridentificacion userprimernombre userprimerapellido userimagen').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {

        if (err) return res.status(500).send({ message: 'Error en la peticion' });


        if (!messages) return res.status(500).send({ message: 'No hay mensajes' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        });

    });


}

//mensajes listado enviados
function getEmmitMessages(req, res) {
    var userId = req.user.sub;

    var page = 1;

    if (req.params.page) {
        page = req.params.page;

    }

    var itemsPerPage = 4;

    Message.find({ emitter: userId }).populate('emitter receiver', 'useridentificacion userprimernombre userprimerapellido userimagen').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {

        if (err) return res.status(500).send({ message: 'Error en la peticion' });


        if (!messages) return res.status(500).send({ message: 'No hay mensajes' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        });

    });


}

//listado de mensaje no vistos
function getviewfalseMessages(req, res) {

    var userId = req.user.sub;
    Message.count({ receiver: userId, viewed: 'false' }).exec((err, count) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        return res.status(200).send({
            'unvieweb': count

        });

    });
}

//listado de mnesajes vistos
function setViewedMessages(req, res) {
    var userId = req.user.sub;
    Message.update({ receiver: userId, viewed: 'false' }, { viewed: 'true' }, { "multi": true }, (err, messageUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        return res.status(200).send({
            message: messageUpdated
        });
    });

}

module.exports = {
    probando,
    saveMessage,
    getReceivedMessages,
    getEmmitMessages,
    getviewfalseMessages,
    setViewedMessages
}