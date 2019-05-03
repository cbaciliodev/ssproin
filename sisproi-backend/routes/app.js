var express = require('express');
var _f = require('../commons/http');
var app = express();


// Rutas
app.get('/', (req, res) => {
    _f.ok(res, _f.HTTP_RESPONSES.SUCCESSFULL, 'Petición enviada OK');
});

module.exports = app;