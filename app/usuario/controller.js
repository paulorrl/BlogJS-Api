var usuarios = require('./usuarios');

var cadastrar = function (req, res) {
    var usuario = req.body;
    res.status(201).json(usuarios.cadastrar(usuario));
};

var listar = function(req, res) {
    res.status(200).json(usuarios.listar());
};

var autenticar = function(req, res) {
    var autenticado = usuarios.autenticar(req.body.login, req.body.senha);
    if (autenticado) {
        autenticado.senha = '';
        res.status(200).json(autenticado);
    } else {
        res.status(401).end();
    }
};

exports.cadastrar = cadastrar;
exports.listar = listar;
exports.autenticar = autenticar;