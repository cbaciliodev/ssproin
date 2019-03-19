var mongoose = require('mongoose');
var Ficha = require('../models/ficha');
var ESTADO_ELIMINADO = require('../config/config').ESTADO_ELIMINADO;

module.exports = {
    list: list,
    select: select,
    insert: insert,
    update: update,
    report: report,
    listRegistro:listRegistro,
    listEvaluacion:listEvaluacion,

}

function list(filtro) {
    return new Promise((resolve, reject) => {
        Ficha.aggregate()
            .match({
                estado: { $ne: ESTADO_ELIMINADO },
                sector_nivel_1: { $regex: `.*${filtro.sector_nivel_1}.*` },
                nombre_programa: { $regex: `.*${filtro.nombre_programa}.*`, $options: 'i' },
                nombre_proyecto: { $regex: `.*${filtro.nombre_proyecto}.*`, $options: 'i' }
            })
            .lookup({
                from: 'parametro',
                let: { sector: '$sector_nivel_1' },
                pipeline: [
                    { $match: { grupo: 'NIVEL_1', $expr: { $eq: ['$nombre', '$$sector'] } } },
                    { $limit: 1 }
                ],
                as: 'sector'
            })
            .unwind({ path: '$sector', preserveNullAndEmptyArrays: true })
            .lookup({
                from: 'parametro',
                let: { prioridad: '$prioridad_sector' },
                pipeline: [
                    { $match: { grupo: 'PRIORIDAD_SECTOR', $expr: { $eq: ['$nombre', '$$prioridad'] } } },
                    { $limit: 1 }
                ],
                as: 'prioridad'
            })
            .unwind({ path: '$prioridad', preserveNullAndEmptyArrays: true })
            .lookup({
                from: 'parametro',
                let: { modalidad: '$modalidad_ejecutiva' },
                pipeline: [
                    { $match: { grupo: 'MODALIDAD_EJECU', $expr: { $eq: ['$nombre', '$$modalidad'] } } },
                    { $limit: 1 }
                ],
                as: 'modalidad'
            })
            .unwind({ path: '$modalidad', preserveNullAndEmptyArrays: true })
            .group({ _id: `$${filtro.tipo}`, lista_fichas: { $push: '$$ROOT' } })
            .project({ _id: 0, estado: '$_id', lista_fichas: 1 })
            .exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
    });
}


function listRegistro() {
 
        var array = [];
        var sector = ['PTRANSPORTE','PAGUA_SANEA','PENERGIA','PTELECOMUNIC','PRIEGO','PSALUD','PEDUCACION'];
    
        return new Promise((resolve, rejec) => {
            function rep(i){
                Ficha.find({ sector_nivel_1: sector[i],estado_registro : 1}).exec((err, reg) => {
                    Ficha.find({ sector_nivel_1: sector[i],estado_registro : 2}).exec((err, data) => {
                        Ficha.find({ sector_nivel_1: sector[i],estado_evaluacion : 1}).exec((err, e1) => {
                            Ficha.find({ sector_nivel_1: sector[i],estado_evaluacion : 2}).exec((err, e2) => {

                        if (err) rejec(err);
                        array.push({sector:sector[i],Registro:reg.length,RegistroFin:data.length,Evaluacion:e1.length,Evaluados:e2.length});
                        if(i==6){
                            resolve(array);
                        }else{
                            rep(i+1);
                        }
                            });
                         });
                    });
                });
            }
         rep(0);
        });              
}


function listEvaluacion() {
    return new Promise((resolve, rejec) => {
        Ficha.find().exec((err, data) => {
            if (err) rejec(err);
            resolve(data);
        });
    });
}


function select(id) {
    return new Promise((resolve, reject) => {
        Ficha.findById(id, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function insert(ficha) {
    var model = new Ficha(ficha);
    return new Promise((resolve, reject) => {
        model.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function update(id, ficha) {
    return new Promise((resolve, reject) => {
        Ficha.findByIdAndUpdate(id, ficha, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function report(id) {
    return new Promise((resolve, reject) => {
        Ficha.findById(id)
            .populate('usuario_reg', '-_id nombre')
            .populate('usuario_eval', '-_id nombre')
            .exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            });
    });
}