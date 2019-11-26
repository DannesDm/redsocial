'use strict'

var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var moment = require('moment');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');

var Publication = require('../models/publication');
var User = require('../models/user');


function probando(req, res) {
    res.status(200).send({
        message: "Controlador de publicaciones"
    });
}


function savePublication(req, res) {
    var params = req.body;

    if (!params.text) return res.status(200).send({ message: 'Debes enviar un texto!' });

    var publication = new Publication();
    publication.text = params.text;
    publication.file = 'null';
    publication.user = req.user.sub;
    publication.created_at = moment().unix();

    publication.save((err, publicationStored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar la publicacion' });

        if (!publicationStored)
            return res.status(404).send({ message: 'la publicacion no ha sido guardada' });

        return res.status(200).send({ publication: publicationStored });
    });


}

/*
function getPublications(req,res){
    var page=1;
    if(req.params.page){
    page = req.params.page;
    }
    var itemsPerPage = 4;
    
    Follow.find({user: req.user.sub}).populate('followed').exec((err,follows)) =>{
    if(err) return res.status(500).send({message: 'Error devolver el seguimiento'});
    
    var follows_clean = [];
    
    
    follows.forEach((follow) =>{
    follows_clean.push(follow.followed);
    });

    follows_clean.push(req.user.sub);
    
    Publication.find({user: {"$in": follows_clean}}).sort('-created_at').populate('user')
    if(err) return res.status(500).send({message: 'Error devolver publicaciones'});
    
    if(!publications) return res.status(404).send({message: 'No hay publicaciones'});
    
    return res.status(200).send({
    total_items: total,
    pages: Math.ceil(total/itemsPerPage),
    page: page,
    items_per_page:itemsPerPage,
    publications
    });
    });
    });
    }
    
    }
*/
function getPublication(req, res) {
    var publicationId = req.params.id;

    Publication.findById(publicationId, (err, publication) => {
        if (err) return res.status(500).send({ message: 'Error devolver publicaciones' });

        if (!publication) return res.status(404).send({ message: 'No existe la publicacion' });

        return res.status(200).send({ publication });

    });

}

function getPublications(req, res) {
    var identity_user_id = req.user.sub;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 5;

    Publication.find().sort('-created_at').paginate(page, itemsPerPage, (err, publications, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!publications) return res.status(404).send({ message: 'No hay publicaciones disponibles' });

        return res.status(200).send({
            publications,
            items_per_page: itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });

    });


}

function deletePublication(req, res) {
    var publicationId = req.params.id;

    Publication.find({ 'user': req.user.sub, '_id': publicationId }).remove(err => {
        if (err) return res.status(500).send({ message: 'Error al borrar la publicaciones' });

        //if (!publicationRemoved) return res.status(404).send({ message: 'No se ha borrado la publicacion' });

        return res.status(200).send({ message: 'Publicacion eliminada correctamente' });

    });


}



function uploadImagenes(req, res) {
    var publicationId = req.params.id;


    //comprobacion si nos llegan archivos
    if (req.files) {

        var file_path = req.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('\\');
        console.log(file_split);
        var file_name = file_split[2];
        console.log(file_name);
        var ext_split = file_name.split('\.');
        console.log(ext_split);
        var file_ext = ext_split[1];
        console.log(file_ext);



        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {


            Publication.findByIdAndUpdate(publicationId, { file: file_name }, { new: true }, (err, publicationUpdated) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' });


                if (!publicationUpdated) return res.status(404).send({ message: 'No se ha podido actualiza el usuario' });

                return res.status(200).send({ publication: publicationUpdated });
            });

        } else {
            return removeFilesOfUploads(res, file_path, 'Extension no valida');
        }

    } else {
        return res.status(200).send({ message: 'No se han subido imagenes' });
    }


}

function removeFilesOfUploads(res, file_path, message) {

    //contrario no se ha subido el archivo
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    });

}

//url que ira cubierta por auntentificacion

function getImagesFiles(req, res) {

    //guarda la peticion de imagen
    var image_file = req.params.imageFile;
    //path de las imagenes
    var path_file = './uploads/publications/' + image_file;
    fs.exists(path_file, (exists) => {
        if (exists) {
            return res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen...' });
        }

    });

}


module.exports = {
    probando,
    savePublication,
    getPublication,
    getPublications,
    deletePublication,
    uploadImagenes,
    getImagesFiles
}