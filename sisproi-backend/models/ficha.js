var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var FichaSchema = new Schema({
    sector_nivel_1: { type: String, required: [true, 'Sector nivel 1 es requerido'] },
    sector_nivel_2: [{ type: String }],
    sector_nivel_3: [{ type: String }],
    jurisdiccion: { type: String, required: [true, 'Jurisdiccion es requerido'] },
    jurisdiccion_otro: { type: String },
    nombre_proyecto: { type: String, required: [true, 'Nombre del proyecto es requerido'], unique: true },
    descripcion: { type: String },
    monto_estimado: { type: Number },
    prioridad_sector: { type: String },
    comentarios_prioridad_sector: { type: String },
    modalidad_ejecutiva: { type: String },
    modalidad_ejecutiva_otra: { type: String },
    nivel_avance: { type: String },
    nivel_avance_fisico: { type: Number },
    nivel_avance_financiero: { type: Number },
    anio_inicio_posible: { type: Number },
    meses_ejecucion: { type: Number },
    departamento: { type: String },
    localizacion_latitud: { type: String },
    localizacion_longitud: { type: String },
    area_influencia: { type: String },

    is_evaluado: { type: Boolean },
    prio_politica_ext: { type: String },
    prio_politica_ext_comentario: { type: String },

    riesgo_dis_tec: { type: String },
    riesgo_dis_tec_comentario: { type: String },

    riesgo_socioamb: { type: String },
    riesgo_socioamb_comentario: { type: String },

    riesgo_otros: { type: String },
    riesgo_otros_comentario: { type: String },

    riesgo_politico: { type: String },
    riesgo_politico_comentario: { type: String },

    riesgo_otro: { type: String },
    riesgo_otro_comentario: { type: String },

    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS },
}, { collection: 'ficha' });

module.exports = mongoose.model('Ficha', FichaSchema);