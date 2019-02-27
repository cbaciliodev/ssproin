var express = require('express');
var app = express();

var _parametro = require('../services/parametro');
var _http = require('../commons/http');

app.get('/', (req, res) => {
    _parametro.list().then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    );
});

module.exports = app;