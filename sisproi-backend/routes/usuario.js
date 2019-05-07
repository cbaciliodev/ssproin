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

    if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password);
        req.body.estado= 2
    }
   _usuario.actualizar(req.params.id,req.body).then(
    data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
    erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro));

});



// CREAR NUEVO USUARIO
// ==========================================
app.post('/',(req, res) => {

    var usuario = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        perfil: req.body.perfil,
        password: bcrypt.hashSync(req.body.password),
        sector: req.body.sector,
        accion: req.body.accion,
        avatar: req.body.avatar 
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