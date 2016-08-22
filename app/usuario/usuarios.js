var Usuario = require('./modelo');
var sha256 = require('sha256');
var respostas = require('../utilidades/respostas');

var cadastrar = function(usuario, quandoSalvar, quandoDerErro) {
    usuario.senha = sha256(usuario.senha);
    new Usuario(usuario).save(respostas.tratar(quandoSalvar, quandoDerErro));
};

var listar = function(quandoListar, quandoDerErro) {
    var filtro = {nome:true, login:true};
    return Usuario.find()
        .select(filtro)
        .exec(respostas.tratar(quandoListar, quandoDerErro));
};

var autenticar = function(login, senha, quandoEncontrar, quandoDerErro) {
    var query = {login:login, senha:sha256(senha)};
    var filtro = {nome:true, login:true};
    Usuario.findOne(query)
        .select(filtro)
        .exec(function(err, usuario) {
            if (err) {
                quandoDerErro(err);
            } else if (usuario) {
                quandoEncontrar(usuario);
            } else {
                quandoDerErro(new Error('Usuário inválido!'));
            }
        });
};

var buscar = function(id, quandoEncontrar, quandoDerErro) {
    var filtro = {login:true, nome:true};
    Usuario.findById(id)
        .select(filtro)
        .exec(function(err, usuario) {
            if (err) {
                quandoDerErro(err);
            } else if(usuario) {
                quandoEncontrar(usuario);
            } else {
                quandoDerErro(new Error('Usuário inválido!'));
            }
        });
};

exports.cadastrar = cadastrar;
exports.listar = listar;
exports.autenticar = autenticar;
exports.buscar = buscar;