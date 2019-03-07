var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var mdAutenticacion = require('../middlewares/autenticacion');
var _usuario = require('../services/usuario');
var _http = require('../commons/http');
var Usuario =require('../models/usuario');




//  OBTENER UN USUARIO
// ==========================================
app.get('/:id',  (req, res) => {
    _usuario.listOne(req.params.id).
        then(
            data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
            erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro)
        );
});
//  OBTENER TODOS LOS USUARIOS
// ==========================================
app.get('/', (req, res) => {

    _usuario.list().then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro));

});
//  OBTENER TODOS LOS USUARIOS EXCEPTO EL QUE ESTA EN USO o VALIDAR QUE CORREO EXISTE
// ==========================================
app.post('/:dato', (req, res) => {
    
    var re = /\S+@\S+\.\S+/;      
    if(re.test(req.params.dato)){
        _usuario.buscarCorreo(req.params.dato).then(
            data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
            erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro));
    }else{
        _usuario.listUsuarios(req.params.dato).then(
            data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
            erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro));
    }

});

//  ACTUALIZAR USUARIO
// ==========================================
app.put('/:id',  (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }


        usuario.nombre = body.nombre;
        usuario.password = body.password;
        usuario.perfil = body.perfil;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});



// CREAR NUEVO USUARIO
// ==========================================
app.post('/',(req, res) => {

    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        password: bcrypt.hashSync(body.password),
        avatar: body.avatar,
        perfil: body.perfil
    });

    _usuario.crear(usuario).
    then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro)
    );
});

//  ELIMINAR USUARIO
// ============================================
app.delete('/:id',  (req, res) => {
_usuario.eliminar(req.params.id).then(
    data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
    erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro)
    );
 
});

module.exports = app;