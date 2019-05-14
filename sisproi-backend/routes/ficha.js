var express = require('express');
var app = express();

var _ficha = require('../services/ficha');
var _http = require('../commons/http');

app.get( '/priorizado/:id/:estado', (req, res) => {
    var id = req.params.id;
    var estado = req.params.estado;
    _ficha.priorizar( id, estado ).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    );
});

app.get('/', (req, res) => {
    _ficha.list( { nombre_programa: '', nombre_proyecto: '', sector_nivel_1: [ 'PSALUD', 'PEDUCACION', 'PAGUA_SANEA', 'PENERGIA', 'PTRANSPORTE', 'PRIEGO', 'PTELECOMUNIC' ] } ).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    );
});

app.post('/', (req, res) => {
    _ficha.list(req.body).then(
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
        _ => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, {}),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    )
});

app.get('/report/:id', (req, res) => {
    _ficha.report(req.params.id).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    );
});

app.post('/reportCSV', (req, res) => {
    _ficha.reportCVS(req.body).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    );
});

app.get('/estado/:sector', (req, res) => {
    _ficha.estadoFicha(req.params.sector).then(
        data => _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data),
        err => _http.err(res, _http.HTTP_RESP.SERVER_ERROR, err)
    );
    
});

module.exports = app;