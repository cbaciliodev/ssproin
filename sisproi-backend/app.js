// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Habilitando CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    next();
});

// Importando rutas
var appRoutes = require('./routes/app');
var loginRoutes = require('./routes/login');
var parametroRoutes = require('./routes/parametro');
var fichaRoutes = require('./routes/ficha');
var serveIndex = require('serve-index');
var usuarioRoutes = require('./routes/usuario');
var filesRoutes = require('./routes/fileUpload');

// Route
app.use('/parametro', parametroRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/ficha', fichaRoutes);
app.use('/files', filesRoutes);
app.use('/', appRoutes);

// MongoDB Access
var db = require('./config/config').MONGODB;

// Conectandose a MongoDB
mongoose.connect(db.MONGODB_URI, db.MONGOOSE_OPTS, (err) => {
    if (err) { throw err; }
    console.log('Base de datos online: \x1b[32m%s\x1b[0m', 'online');
});

// Escuchar peticiones
app.listen(3040, () => {
    console.log('Servidor iniciado en el puerto 3040: \x1b[32m%s\x1b[0m', 'online');
});