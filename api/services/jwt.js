'use strict'

/*jwt crea un objeto payload revisar el concepto de payload en nodejs*/
var jwt = require('jwt-simple');
var moment = require('moment'); // es la dependencia para fechas

var secret = 'clave_secreta_para_token';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        useridentificacion: user.useridentificacion,
        userprimernombre: user.userprimernombre,
        usersegundonombre: user.usersegundonombre,
        userprimerapellido: user.userprimerapellido,
        usersegundoapellido: user.usersegundoapellido,
        usercorreo: user.usercorreo,
        usersector: user.usersector,
        usertelefono: user.usertelefono,
        userrol: user.userrol,
        userimagen: user.userimagen,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix


    };

    return jwt.encode(payload, secret);

};