var Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');

module.exports = {
    list: list,
    crear:crear,
    eliminar:eliminar,
    actualizar:actualizar,
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
        
        Usuario.find({ correo: {$regex: correo, $options:"i"} }).exec((err, data) => {
            if (err) rejec(err);
            resolve(data);
        });
    });
}

function actualizar(id,usuario) {
    return new Promise((resolve, reject) => {
        Usuario.findById(id, (err, data) => {
            if (err) reject(err);
        
        data.nombre = usuario.nombre;
        data.password=bcrypt.hashSync(usuario.password);
        data.accion=usuario.accion;
        data.sector=usuario.sector;

        data.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        });    
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
