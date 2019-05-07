var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    correo: { type: String, required: [true, 'Email es requerido']},
    password: { type: String, required: [true, 'Contraseña es requerida'] },
    perfil: { type: String, required: [true, 'Perfil es requerido']  },
    sector: [{ type: String }],
    accion: [{ type: String }],
    avatar: { type: String },
    estado: { type: Number, required: true, default: 1 }
}, { collection: 'usuario' });

// Se utiliza {PATH} para leer la propiedad del campo
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);