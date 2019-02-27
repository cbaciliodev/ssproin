var express = require('express');
var app = express();

var _ficha = require('../services/ficha');
var _http = require('../commons/http');

app.post('/insert', (req, res) => {
    _ficha.insert(req.body).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    )
});

app.post('/update/:id', (req, res) => {
    _ficha.update(req.params.id, req.body).then(
        data => _http.ok(_http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    )
});

module.exports = app;