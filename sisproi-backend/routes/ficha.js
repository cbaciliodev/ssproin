var express = require('express');
var app = express();

var _ficha = require('../services/ficha');
var _http = require('../commons/http');

app.get('/', (req, res) => {
    _ficha.list().then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    );
});

app.get('/select/:id', (req, res) => {
    _ficha.select(req.params.id).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    );
});

app.post('/insert', (req, res) => {
    _ficha.insert(req.body).then(
        ficha => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, { insert: true, ficha }),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    )
});

app.post('/update', (req, res) => {
    _ficha.update(req.body._id, req.body).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, {}),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    )
});

module.exports = app;