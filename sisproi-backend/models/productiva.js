var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Departamento = require('./departamento');
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var ProductivaSchema = new Schema({
    sector_proyecto :{ type: String },
    nombre_proyecto: { type: String },
    operador: { type: String },
    inversionista: [{ type: String }],
    region: [Departamento],
    ubicacion: { type: String },
    inversion_global: { type: Number },
    inversion_ejecutada: { type: Number },
    anio_contruccion: { type: Number },
    anio_operacion: { type: Number },
    tipo_proyecto: { type: String },
    tipo_yacimiento: { type: String },
    vida_util: { type: Number },
    potencia_energia: { type: Number },
    fuente_agua: [{ type: Boolean }],
    capacidad_agua: { type: String },
    produccion_anual: { type: String },
    etapa_avance: { type: String },
    observacion_avance: { type: String },
    impacto_ambiental: { type: String },
    observacion_ambiental: { type: String },
    actividad_explotacion: { type: String },
    observacion_explotacion: { type: String },
    concesion_beneficio: { type: String },
    observacion_beneficio: { type: String },
    dato_adicional: { type: String },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO }
}, { collection: 'productiva' });

module.exports = mongoose.model('Productiva', ProductivaSchema);