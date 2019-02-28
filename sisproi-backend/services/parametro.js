var Parametro = require('../models/parametro');
var ESTADO_ELIMINADO = require('../config/config').ESTADO_ELIMINADO;

module.exports = {
    list: list
}

function list() {
    return new Promise((resolve, reject) => {
        Parametro.aggregate()
            .match({ estado: { $ne: ESTADO_ELIMINADO } })
            .group({
                _id: '$grupo',
                parametros: {
                    $push: {
                        nombre: '$nombre',
                        alias: '$alias',
                        valor_texto: '$valor_texto',
                        valor_numero: '$valor_numero'
                    }
                }
            }).exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            });
    });
}