var Ficha = require('../models/ficha');
var ESTADO_ELIMINADO = require('../config/config').ESTADO_ELIMINADO;

module.exports = {
    list: list,
    select: select,
    insert: insert,
    update: update,
    report: report,
    reportCVS: reportCVS,
    estadoFicha: estadoFicha,
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

function estadoFicha(sector) {
    return new Promise((resolve, rejec) => {
        Ficha.find({ sector_nivel_1: sector, estado_registro: 1 }).exec((err, r1) => {
            Ficha.find({ sector_nivel_1: sector, estado_registro: 2 }).exec((err, r2) => {
                Ficha.find({ sector_nivel_1: sector, estado_evaluacion: 1 }).exec((err, e1) => {
                    Ficha.find({ sector_nivel_1: sector, estado_evaluacion: 2 }).exec((err, e2) => {
                        if (err) rejec(err);
                        resolve({ sector: sector, Registro: r1.length, RegistroFin: r2.length, Evaluacion: e1.length, Evaluados: e2.length });
                    });
                });
            });
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

function reportCVS() {
    return new Promise((resolve, reject) => {
        Ficha.aggregate()
            .match({ estado: { $ne: ESTADO_ELIMINADO } })
            .lookup({
                from: 'parametro',
                let: { sector: '$sector_nivel_1' },
                pipeline: [{ $match: { grupo: 'NIVEL_1', $expr: { $eq: ['$nombre', '$$sector'] } } }, { $limit: 1 }],
                as: 'sector'
            })
            .unwind({ path: '$sector', preserveNullAndEmptyArrays: true })
            .lookup({
                from: 'parametro',
                let: { jurisdiccion: '$jurisdiccion' },
                pipeline: [{ $match: { grupo: 'JURISDICCION', $expr: { $eq: ['$nombre', '$$jurisdiccion'] } } }, { $limit: 1 }],
                as: 'jurisdiccion'
            })
            .unwind({ path: '$jurisdiccion', preserveNullAndEmptyArrays: true })
            .lookup({
                from: 'parametro',
                let: { prioridad: '$prioridad_sector' },
                pipeline: [{ $match: { grupo: 'PRIORIDAD_SECTOR', $expr: { $eq: ['$nombre', '$$prioridad'] } } }, { $limit: 1 }],
                as: 'prioridad'
            })
            .unwind({ path: '$prioridad', preserveNullAndEmptyArrays: true })
            .lookup({
                from: 'parametro',
                let: { modalidad: '$modalidad_ejecutiva' },
                pipeline: [{ $match: { grupo: 'MODALIDAD_EJECU', $expr: { $eq: ['$nombre', '$$modalidad'] } } }, { $limit: 1 }],
                as: 'modalidad'
            })
            .unwind({ path: '$modalidad', preserveNullAndEmptyArrays: true })
            .lookup({
                from: 'parametro',
                let: { avance: '$nivel_avance' },
                pipeline: [{ $match: { grupo: 'NIVEL_AVANCE', $expr: { $eq: ['$nombre', '$$avance'] } } }, { $limit: 1 }],
                as: 'avance'
            })
            .unwind({ path: '$avance', preserveNullAndEmptyArrays: true })
            .project({
                _id: 0,
                sector: { $ifNull: ['$sector.alias', ''] },
                jurisdiccion: { $ifNull: ['$jurisdiccion.alias', ''] },
                nombre_programa: 1, descripcion_programa: 1,
                nombre_proyecto: 1, descripcion_proyecto: 1, monto_estimado: 1,
                prioridad: { $ifNull: ['$prioridad.alias', ''] },
                comentarios_prioridad_sector: 1,
                modalidad: { $ifNull: ['$modalidad.alias', ''] },
                avance: { $ifNull: ['$avance.alias', ''] },
                nivel_avance_observacion: 1, anio_inicio_posible: 1,
                anio_puesta_operacion: 1, comentarios: 1,
                departamento: {
                    $reduce: {
                        input: '$departamento',
                        initialValue: '',
                        in: {
                            $cond: [
                                { $eq: ['$$value', ''] }, '$$this.alias',
                                { $concat: ['$$value', ', ', '$$this.alias'] }
                            ]
                        }
                    }
                },
                prio_politica_sect: 1, prio_politica_sect_comentario: 1,
                
                riesgo_dis_tec: 1, riesgo_dis_tec_comentario: 1,
                riesgo_dis_deman: 1, riesgo_dis_deman_comentario: 1,
                riesgo_socioamb: 1, riesgo_socioamb_comentario: 1,
                riesgo_politico: 1, riesgo_politico_comentario: 1,
                riesgo_institucional: 1, riesgo_institucional_comentario: 1,
                riesgo_otros: 1, riesgo_otros_comentario: 1,

                productiva_mineria: 1, productiva_mineria_comentario: 1,
                productiva_agri: 1, productiva_agri_comentario: 1,
                productiva_pesca: 1, productiva_pesca_comentario: 1,
                productiva_indus: 1, productiva_indus_comentario: 1,
                productiva_otros: 1, productiva_otros_comentario: 1,
                social_trans: 1, social_trans_comentario: 1,
                social_telco: 1, social_telco_comentario: 1,
                social_agua: 1, social_agua_comentario: 1,
                social_riego: 1, social_riego_comentario: 1,
                social_educa: 1, social_educa_comentario: 1,
                social_salud: 1, social_salud_comentario: 1,
                sintesis_evaluacion: 1
            })
            .exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            });
    });
}