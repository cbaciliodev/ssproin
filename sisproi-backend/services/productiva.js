var Productiva = require('../models/productiva');
var ESTADO_ELIMINADO = require('../config/config').ESTADO_ELIMINADO;

module.exports = {
    list: list,
    select: select,
    insert: insert,
    update: update,
    eliminar: eliminar
}

function list(filtro) {
    return new Promise((resolve, reject) => {
        Productiva.aggregate()
            .match({
                estado: { $ne: ESTADO_ELIMINADO },
                nombre_proyecto: { $regex: `.*${filtro.nombre_proyecto}.*`, $options: 'i' },
                operador: { $regex: `.*${filtro.operador}.*`, $options: 'i' }
            })
            .exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
    });
}

function select(id) {
    return new Promise((resolve, reject) => {
        Productiva.findById(id, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function insert(productiva) {
    var model = new Productiva(productiva);
    return new Promise((resolve, reject) => {
        model.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function update(id, productiva) {
    return new Promise((resolve, reject) => {
        Productiva.findByIdAndUpdate(id, productiva, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function eliminar(id) {
    return new Promise((resolve, reject) => {
        Productiva.findByIdAndUpdate(id, { estado: 3 }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}