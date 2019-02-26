var express = require('express');
var app = express();

var _usuario = require('../services/usuario');
var _http = require('../commons/http');

app.get('/', (req, res) => {

    _usuario.list().then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        erro => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, erro));

});

module.exports = app;