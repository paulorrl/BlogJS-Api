var usuarios = require('./usuarios');
var respostas = require('../utilidades/respostas');

var cadastrar = function (req, res) {
    var usuario = req.body;

    usuarios.cadastrar(usuario, respostas.criado(res), respostas.erro(res));
};

var autenticar = function(req, res) {
    usuarios.autenticar(req.body.login, req.body.senha, respostas.ok(res), respostas.erro(res));
};

var buscar = function(req, res) {
    var id = req.params.id;

    usuarios.buscar(id, respostas.ok(res), respostas.erro(res));
};

var listar = function(req, res) {
    usuarios.listar(respostas.ok(res), respostas.erro(res));
};

exports.cadastrar = cadastrar;
exports.autenticar = autenticar;
exports.buscar = buscar;
exports.listar = listar;