
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var perfilSchema = new Schema({
    nombre: { type: String, unique:true, required: [true, 'Nombre es requerido'] },
    pagina1: [{ type: String }],
    pagina2: [{ type: String }],
    pagina3: [{ type: String }],
    pagina4: [{ type: String }],
    pagina5: [{ type: String }],
    pagina6: [{ type: String }],
    estado: { type: Number, required: true, default: 1 }
}, { collection: 'perfil' });

module.exports = mongoose.model('Perfil', perfilSchema);