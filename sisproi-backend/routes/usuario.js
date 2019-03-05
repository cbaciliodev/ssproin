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
    var id = req.params.id;

    Usuario.findById(id , (err, usuario) => {
        
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
        
        res.status(200).json({
            ok: true,
            usuario: usuario
        });
        })
    })
//  OBTENER TODOS LOS USUARIOS
// ==========================================
app.get('/', (req, res) => {

    _usuario.list().then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro));

});

// Actualizar usuario
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



// Crear un nuevo usuario
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

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariaToken: req.usuario
           
        });
    });
});

//   Borrar un usuario por el id
// ============================================
app.delete('/:id',  (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

module.exports = app;