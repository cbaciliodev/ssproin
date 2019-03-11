var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var PERFIL = {
    values: ['Administrador', 'Usuario'],
    message: '{VALUE} no es un perfil permitido'
}

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    correo: { type: String, required: [true, 'Email es requerido'], unique: true },
    password: { type: String, required: [true, 'Contraseña es requerida'] },
    avatar: { type: String },
    perfil: { type: String, required: [true, 'Perfil es requerido'], enum: PERFIL }
}, { collection: 'usuario' });

// Se utiliza {PATH} para leer la propiedad del campo
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);