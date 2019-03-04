var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Departamento = require('./departamento');
var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_INICIAL = require('../config/config').ESTADO_INICIAL;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var FichaSchema = new Schema({
    sector_nivel_1: { type: String, required: [true, 'Sector nivel 1 es requerido'] },
    sector_nivel_2: [{ type: Boolean }],
    sector_nivel_3: [{ type: Boolean }],
    sector_nivel_4: [{ type: Boolean }],
    jurisdiccion: { type: String, required: [true, 'Jurisdiccion es requerido'] },
    jurisdiccion_otro: { type: String },
    nombre_programa: { type: String },
    descripcion_programa: { type: String },
    nombre_proyecto: { type: String, required: [true, 'Nombre del proyecto es requerido'], unique: true },
    descripcion_proyecto: { type: String },
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
    departamento: [Departamento],
    localizacion_latitud: { type: String },
    localizacion_longitud: { type: String },
    area_influencia: { type: String },

    estado_registro: { type: Number, required: true, default: ESTADO_ACTIVO },
    estado_evaluacion: { type: Number },

    prio_politica_sect: { type: String },
    prio_politica_sect_comentario: { type: String },
    riesgo_dis_tec: { type: String },
    riesgo_dis_tec_comentario: { type: String },
    riesgo_dis_deman: { type: String },
    riesgo_dis_deman_comentario: { type: String },
    riesgo_socioamb: { type: String },
    riesgo_socioamb_comentario: { type: String },
    riesgo_politico: { type: String },
    riesgo_politico_comentario: { type: String },
    riesgo_otros: { type: String },
    riesgo_otros_comentario: { type: String },
    
    productiva_mineria: {type: Boolean},
    productiva_mineria_comentario: { type: String },
    productiva_agri: {type: Boolean},
    productiva_agri_comentario: { type: String },
    productiva_pesca: {type: Boolean},
    productiva_pesca_comentario: { type: String },
    productiva_indus: {type: Boolean},
    productiva_indus_comentario: { type: String },
    productiva_otros: {type: Boolean},
    productiva_otros_comentario: { type: String },

    social_trans: {type: Boolean},
    social_trans_comentario: { type: String },
    social_telco: {type: Boolean},
    social_telco_comentario: { type: String },
    social_agua: {type: Boolean},
    social_agua_comentario: { type: String },
    social_riego: {type: Boolean},
    social_riego_comentario: { type: String },
    social_educa: {type: Boolean},
    social_educa_comentario: { type: String },
    social_salud: {type: Boolean},
    social_salud_comentario: { type: String },

    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS },
}, { collection: 'ficha' });

module.exports = mongoose.model('Ficha', FichaSchema);