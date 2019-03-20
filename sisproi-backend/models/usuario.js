var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    correo: { type: String, required: [true, 'Email es requerido'], unique: true },
    password: { type: String, required: [true, 'Contraseña es requerida'] },
    sector: [{ type: String }],
    accion: [{ type: String }],
    avatar: { type: String }
}, { collection: 'usuario' });

// Se utiliza {PATH} para leer la propiedad del campo
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);