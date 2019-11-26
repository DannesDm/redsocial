'use strict'

/*Para crear los tokens que son un conjunto de archivos que tiene encriptado todo
el usuario o el objeto
*/

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave_secreta_para_token";

//next funcion que salta a otra cosa
//req recibe datos
//res duvuelve datos
//ensureAuth necesita una autentificacion
exports.ensureAuth = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La peticion no tiene la cabera de autenticacion' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    //payload el objeto completo que tiene el token dentro
    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix) {
            return res.status(401).send({
                message: 'El token ha expirado'
            });
        }
    } catch (ex) {
        return res.status(401).send({
            message: 'El token no es valido'
        });
    }
    req.user = payload;

    next();

}

//utilizar dentro de la rutas