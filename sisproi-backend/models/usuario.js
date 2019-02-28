var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var ROLES = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    correo: { type: String, required: [true, 'Email es requerido'], unique: true },
    password: { type: String, required: [true, 'Contraseña es requerida'] },
    avatar: { type: String },
    role: { type: String, required: [true, 'Rol es requerida'], default: 'USER_ROLE', enum: ROLES }
}, { collection: 'usuario' });

// Se utiliza {PATH} para leer la propiedad del campo
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);