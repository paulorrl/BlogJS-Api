var usuarios = require('./usuarios');

var cadastrar = function (req, res) {
    var usuario = req.body;
    
    usuarios.cadastrar(usuario, function(resultado) {
        res.status(201).json(resultado);

    }, function(erro) {
        res.status(400).json(erro);

    });
};

var listar = function(req, res) {
    usuarios.listar(function(usuarios) {
        res.status(200).json(usuarios);

    }, function(erro) {
        res.status(400).json(erro);

    });
};

var autenticar = function(req, res) {
    usuarios.autenticar(req.body.login, req.body.senha, function(usuario) {
        res.status(200).json(usuario);

    }, function(erro) {
        res.status(400).json(erro);

    });
};

var buscar = function(req, res) {
    var id = req.params.id;

    usuarios.buscar(id, function(usuario) {
        res.status(200).json(usuario);

    }, function(erro) {
        res.status(400).json(erro);

    });
};

exports.cadastrar = cadastrar;
exports.listar = listar;
exports.autenticar = autenticar;
exports.buscar = buscar;