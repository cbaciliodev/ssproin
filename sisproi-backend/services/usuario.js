var Usuario = require('../models/usuario');


module.exports = {
    list: list,
    crear:crear,
    eliminar:eliminar,
    listOne:listOne,
    listUsuarios:listUsuarios,
    buscarCorreo:buscarCorreo
}

function listOne(id){
    return new Promise((resolve, reject) => {
        Usuario.findById(id, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function list() {
    return new Promise((resolve, rejec) => {
        Usuario.find().exec((err, data) => {
            if (err) rejec(err);
            resolve(data);
        });
    });
}

//lista todos los usuarios execepto el que esta en uso
function listUsuarios(id) {
    return new Promise((resolve, rejec) => {
        Usuario.find({ _id: { $nin: [id] } }).exec((err, data) => {
            if (err) rejec(err);
            resolve(data);
        });
    });
}
//BUSCAR CORREO PARA COMPROBAR DUPLICIDAD
function buscarCorreo(correo) {
    return new Promise((resolve, rejec) => {
        Usuario.find({ correo: { $eq: [correo] } }).exec((err, data) => {
            if (err) rejec(err);
            resolve(data);
        });
    });
}



function crear(usuario) {
    var model = new Usuario(usuario);
    return new Promise((resolve, reject) => {
        model.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function eliminar(id) {
    return new Promise((resolve, reject) => {
        Usuario.findByIdAndRemove(id, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
