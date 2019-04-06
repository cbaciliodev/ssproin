var express = require('express');
var mime = require('mime-types');
var app = express();

const path = require('path');
const fs = require('fs');
const multer = require('multer');

var _http = require('../commons/http');

// app.use(express.static('/data/ssproi/'));
// app.use('/uploads', serveIndex('/data/ssproi/uploads'));


const DIR = '/data/ssproin/kml';
let filename = '';

// Configurando datastorage
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, DIR),
    filename: (req, file, cb) => {
        filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});
let upload = multer({ storage: storage });


app.get('/', function(req, res) {
    _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, 'API de subida de archivos');
});

app.post('/upload', upload.single('file'), function(req, res) {
    if (!req.file) {
        _http.err(res, _http.HTTP_RESP.SERVER_ERROR, 'Error al registrar el archivo');
    } else {
        data = { filename: filename };
        _http.ok(res, _http.HTTP_RESP.SUCCESSFULL, data);
    }
});

app.get('/:filename', function(req, res) {
    const filename = req.params.filename;

    var filePath = path.join(DIR, filename);
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': mime.lookup(filename),
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

module.exports = app;