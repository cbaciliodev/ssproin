var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartamentoSchema = new Schema({
    nombre: { type: String },
    alias: { type: String }
}, { _id: false, versionKey: false });

module.exports = DepartamentoSchema;