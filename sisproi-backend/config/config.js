// Key para Json Web Token
module.exports.SEED = 'sisproi-jwt-2019';

// Estados de los módulos
module.exports.ESTADOS = {
    values: [1, 0],
    message: '{VALUE} no es un estado permitido'
};

// Estado por default
module.exports.ESTADO_ACTIVO = 1;

// Mongo atlas credentials
module.exports.MONGODB = {
    MONGODB_URI: 'mongodb+srv://bid-uyh7h.azure.mongodb.net',
    MONGOOSE_OPTS: {
        user: 'ssproin',
        pass: 'uSXxAzjZexT71z7j',
        dbName: 'ssproin-db',
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }
};