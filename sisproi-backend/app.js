// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Habilitando CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importando rutas
var appRoutes = require('./routes/app');
var parametroRoutes = require('./routes/parametro');
var loginRoutes = require('./routes/usuario');
var fichaRoutes = require('./routes/ficha');
var serveIndex = require('serve-index');

app.use(express.static('/data/ssproi/'));
app.use('/uploads', serveIndex('/data/ssproi/uploads'));

// Route
app.use('/parametro', parametroRoutes);
app.use('/login', loginRoutes);
app.use('/ficha', fichaRoutes);
app.use('/', appRoutes);

// MongoDB Access
var db = require('./config/config').MONGODB;

// Conectandose a MongoDB
mongoose.connect(db.MONGODB_URI, db.MONGOOSE_OPTS, (err) => {
    if (err) { throw err; }
    console.log('Base de datos online: \x1b[32m%s\x1b[0m', 'online');
});

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});