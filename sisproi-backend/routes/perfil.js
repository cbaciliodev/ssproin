var express = require('express');
var app = express();
var _perfil = require('../services/perfil');
var _http = require('../commons/http');
var Perfil = require('../models/perfil');

//OBTENER UN PERFIL:
//========================================

app.get('/:id', (req, res) => {
    _perfil.listOne(req.params.id).
        then(
            data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
            erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro)
        );
});

//  OBTENER TODOS LOS PERFILES
// ==========================================
app.get('/', (req, res) => {
    _perfil.list().then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro));
});

// CREAR NUEVO PERFIL
// ==========================================
app.post('/',(req, res) => {
    _perfil.crear(req.body).
    then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro)
    );
});

//  ACTUALIZAR USUARIO
// ==========================================
app.put('/:id', (req, res) => {

    _perfil.actualizar(req.params.id, req.body).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro));
});

//  ELIMINAR PERFIL
// ============================================
app.delete('/:id', (req, res) => {
    _perfil.eliminar(req.params.id).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro)
    );

});

module.exports = app;