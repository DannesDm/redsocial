'use strict'
/*En el controlador Se escriben todos los metodos que va tener cada Esquema*/

var bcrypt = require('bcrypt-nodejs'); /*Encriptar contraseña usuario*/

//Llama a los esquemas
var User = require('../models/user');
var Follow = require('../models/follow');
var Publication = require('../models/publication');
var jwt = require('../services/jwt'); //Instancia del servicio
var mongoosePaginate = require('mongoose-pagination'); //mostrar usuarios en pagina
var fs = require('fs'); //para archivos




//rutas de ficheros
var path = require('path'); //ruta de sistema de ficheros



/*Metodos de prueba para el postman*/
function home(req, res) {
    res.status(200).send({
        message: "Pagina Principal"
    });
}

function pruebas(req, res) {

    res.status(200).send({
        message: "Accion de pruebas en el servidor de Nodejs"
    });
}





//Guarda el usuario
//Un peticion y una respuesta
function saveUser(req, res) {
    var params = req.body;
    var user = new User();

    if (
        params.useridentificacion && params.userprimernombre &&
        params.usersegundonombre && params.userprimerapellido &&
        params.usersegundoapellido && params.usercorreo &&
        params.usersector && params.usertelefono && params.userpassword
    ) {

        user.useridentificacion = params.useridentificacion;
        user.userprimernombre = params.userprimernombre;
        user.usersegundonombre = params.usersegundonombre;
        user.userprimerapellido = params.userprimerapellido;
        user.usersegundoapellido = params.usersegundoapellido;
        user.usercorreo = params.usercorreo;
        user.usersector = params.usersector;
        user.usertelefono = params.usertelefono;
        user.userrol = 'ROLE_USER';
        user.userimagen = null;


        //controlar usuarios duplicados
        User.find({
            useridentificacion: user.useridentificacion.toLowerCase()
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion del usuario' });
            if (users && users.length >= 1) {
                return res.status(200).send({ message: 'El usuario que intenta registar ya existe' });
            } else {

                //encripta la password
                bcrypt.hash(params.userpassword, null, null, (err, hash) => {
                    user.userpassword = hash;

                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar al usuario' });
                        /*Para guardar en objeto JSON*/
                        if (userStored) {
                            res.status(200).send({ user: userStored });
                        } else {


                            res.status(404).send({ message: 'No se ha registrado el usuario' });

                        }
                    });

                });

            }
        });






    } else {
        res.status(200).send({
            message: "Envia todos los datos!!"
        });
        //variable params sirve para cuando manden una peticion por post se guarda en esa variable
        //req es request y res es responsive
    }
}


//metodoIngresoUsuario
function loginUser(req, res) {
    var params = req.body;

    var useridentificacion = params.useridentificacion;
    var userpassword = params.userpassword;


    User.findOne({ useridentificacion: useridentificacion }, (err, user) => {


        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (user) {
            bcrypt.compare(userpassword, user.userpassword, (err, check) => {

                console.log(userpassword);
                console.log("otro");
                console.log(user.userpassword);
                console.log(check);
                if (check) {
                    if (params.gettoken) {
                        //generar y devolver token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        //devolver datos de usuario
                        user.userpassword = undefined;
                        return res.status(200).send({ user });
                    }


                } else {
                    return res.status(500).send({ message: 'El usuario no se ha identificado' });

                }
            });


        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar!!' });
        }

    });

}


// Conseguir datos de un usuario
function getUser(req, res) {
    var userId = req.params.id; //params recoge por url o get

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!user) return res.status(404).send({ mesage: 'El usuario no existe' }); //cuando venga un id que no existe
        /*
                followThisUser(req.user.sub, userId).then((value) => {
                    user.userpassword = undefined;

                    console.log("pedro:" + req.user.sub);
                    console.log("ana" + userId);
                    console.log("valor" + value.followed);
                    return res.status(200).send({
                        user,
                        following: value.following,
                        followed: value.followed

                    });
                });

               

                 */
        return res.status(200).send({
            user
        });

    });
}

/*
async function followThisUser(identity_user_id, user_id) {
    const following = await Follow.findOne({ $and: [{ user: identity_user_id }, { followed: user_id }] }).exec((err, follow) => {
        if (err) return handleError(err);
        return follow;


    });

    console.log(following);
    const followed = await Follow.findOne({ user: user_id, followed: identity_user_id }).exec((err, follow) => {
        if (err) return handleError(err);

        return follow;
    });

    console.log(followed);
    if (following == undefined) {

        return {
            following: following,
            followed: followed
        }

    }

}

followThisUser();
*/
/*
function getUser(req, res) {
    var userId = req.params.id;


    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!user) return res.status(404).send({ message: 'El usuario no existe' });


        followThisUser(req.user.sub, userId).then((value) => {
            user.userpassword = undefined;

            return res.status(200).send({
                user,
                following: value.following,
                followed: value.followed

            });

        });

    });
}
*/
/*
async function followThisUser(identity_user_id, user_id) {
    var following = await Follow.findOne({ "user": identity_user_id, "followed": user_id }).exec((err, follow) => {
        if (err) return handleError(err);
        return follow;
    });

    var followed = await Follow.findOne({ "user": user_id, "followed": identity_user_id }).exec((err, follow) => {
        if (err) return handleError(err);
        return follow;
    });


    return {
        following: following,
        followed: followed
    }


}
*/

// Lista de todos los usuarios
function getUsers(req, res) {

    var identity_user_id = req.user.sub; //encontrar al usuario que este logeado 

    var page = 1;
    //verificar si llega una pagina
    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 5; //numero de usuarios en una pagina

    //listar todos los documentos
    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {

        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!users) return res.status(404).send({ message: 'No hay usuarios disponibles' });

        //array de objetos y redondear el numero de paginas
        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total / itemsPerPage) //redondear datos
        });
    });
}

//listado de total usuarios
function getMyUsers(req, res) {

    // Usamos el método find sobre nuesta entidad Nota y ordenamos los resultados
    User.find({}).sort({ '_id': -1 }).exec((err, users) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        // Devolvemos el resultado de la query en json
        if (users) {
            return res.status(200).send({
                users
            });
        } else {
            return res.status(404).send({
                message: 'No hay usuarios'
            });
        }

    });

}
//Devolver un listado de usuarios paginados
/*
function getUsers(req, res) {
    //encontrar al usuario que este logeado 
    var identity_user_id = req.user.sub;

    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    //numero de usuarios en una pagina
    var itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {

        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!users) return res.status(404).send({ message: 'No hay usuarios disponibles' });

        //array de objetos y redondear el numero de paginas
        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });

    });

}
*/

/*
function getUsers(req, res) {
    //encontrar al usuario que este logeado 
    var identity_user_id = req.user.sub;

    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    //numero de usuarios en una pagina
    var itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {

        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!users) return res.status(404).send({ message: 'No hay usuarios disponibles' });

        //array de objetos y redondear el numero de paginas
        followUserIds(identity_user_id).then((value) => {
            return res.status(200).send({
                users,
                users_following: value.following,
                users_follow_me: value.followed,
                total,
                pages: Math.ceil(total / itemsPerPage)
            });
        });


    });

}
*/
/*
async function followUserIds(user_id) {
    var following = await Follow.find({ "user": user_id }).select({ '_id': 0, '__v': 0, 'user': 0 }).exec((err, follows) => {
        return follows;


    });

    var followed = await Follow.find({ "followed": user_id }).select({ '_id': 0, '__v': 0, 'followed': 0 }).exec((err, follows) => {

        return follows;
    });

    //Procesar followinds ids

    var following_clean = [];

    following.forEach((follow) => {
        following_clean.push(follow);
    });

    //Procesar followed ids

    var followed_clean = [];

    followed.forEach((follow) => {
        followed_clean.push(follow.user);
    });


    return {
        following: following_clean,
        followed: followed_clean

    }
}
*/

/*
function getCounters(req, res) {
    var userId = req.user.sub;
    if (req.params.id) {
        userId = req.params.id;
    }

    getCountFollow(req.params.id).then((value) => {
        return res.status(200).send(value);
    });


}

async function getCountFollow(user_id) {
    var following = await Follow.count({ "user": user_id }).exec((err, count) => {
        if (err) return err;
        return count;


    });


    var followed = await Follow.count({ "followed": user_id }).exec((err, count) => {
        if (err) return err;
        return count;



    });

    var publications = await Publication.count({ "user": user_id }).exec((err, count) => {
        if (err) return err;

        return count;




    });

    return {
        following: following,
        followed: followed,
        publications: publications
    }

}

*/






//Edicion de datos de usuario
function updateUser(req, res) {

    var userId = req.params.id;
    var update = req.body; //recoge el usuario con los nuevos datos

    //delete propiedad password metodo aparte par actualizar la password
    delete update.password;

    //verificar que sea el mismo usuario el mismo id del token tiene que ser igual al que llega por url
    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permiso para actualizar los datos del usuario' });

    }

    //buscar el objeto y le paso los datos
    //new : true devuelve el objeto nuevo
    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });


        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });

        return res.status(200).send({ user: userUpdated });

    });
}


//Subir archivos de imagen/avatar de usuario
function uploadImage(req, res) {
    var userId = req.params.id; //id del usuario

    //comprobacion si nos llegan archivos
    if (req.files) {
        var file_path = req.files.image.path;

        var file_split = file_path.split('\\');

        var file_name = file_split[2];

        //extension del archivo para ver si es una imagen o otro archivo
        var ext_split = file_name.split('\.');
        // console.log(ext_split);
        var file_ext = ext_split[1];
        // console.log(file_ext);


        //comprobar que sea el usuario de la cuenta
        if (userId != req.user.sub) {
            return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar la imagen del usuario');


        }

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

            //Actualizar documento de usuario logueado

            User.findByIdAndUpdate(userId, { userimagen: file_name }, { new: true }, (err, userUpdated) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' });


                if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });

                return res.status(200).send({ user: userUpdated });
            });



        } else {
            return removeFilesOfUploads(res, file_path, 'Extension de archivo no valida');
        }


    } else {
        res.status(200).send({ message: 'No se han subido imagenes o archivos' });
    }

}

function removeFilesOfUploads(res, file_path, message) {

    //contrario no se ha subido el archivo
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    });

}

//url que ira protegida por auntentificacion
//accesible solo para usuarios identificados
function getImageFile(req, res) {


    var image_file = req.params.imageFile; //guarda la peticion de imagen por url
    //path de las imagenes
    var path_file = './uploads/users/' + image_file;
    //verificar que el fichero existe 
    fs.exists(path_file, (exists) => {
        if (exists) {
            return res.sendFile(path.resolve(path_file)); //devuelve el fichero
        } else {
            res.status(200).send({ message: 'No existe la imagen...' });
        }

    });

}




//exportar las funcions en objeto para acceder a ellas
module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    getMyUsers,
    updateUser,
    uploadImage,
    getImageFile
};