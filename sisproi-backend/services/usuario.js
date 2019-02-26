var Usuario = require('../models/usuario');


module.exports = {
    list: list
}

function list() {

    return new Promise((resolve, rejec) => {
        Usuario.find({}).exec((err, data) => {
            if (err) rejec(err);
            resolve(data);
        });
    });

}