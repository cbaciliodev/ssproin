var Perfil = require('../models/perfil');

module.exports = {
    list: list,
    listOne:listOne,
    crear:crear,
    eliminar:eliminar,
    actualizar:actualizar,
}

function listOne(id){
    return new Promise((resolve, reject) => {
        Perfil.findById(id, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function list() {
    return new Promise((resolve, rejec) => {
        Perfil.find({estado:{$ne :3}}).exec((err, data) => {
            if (err) rejec(err);
            resolve(data);
        });
    });
}

function crear(perfil) {
    var model = new Perfil(perfil);
    return new Promise((resolve, reject) => {
        model.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function eliminar(id) {
    return new Promise((resolve, reject) => {
        Perfil.findByIdAndUpdate(id, {estado:3}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function actualizar(id,perfil) {
    return new Promise((resolve, reject) => {
        Perfil.findByIdAndUpdate(id, perfil, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}