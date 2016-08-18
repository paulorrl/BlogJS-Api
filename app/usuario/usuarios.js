var usuarios = [];
var id = 0;

var cadastrar = function(usuario) {
    usuario.id = ++id;
    usuarios.push(usuario);
    return usuario;
};

var listar = function() {
    return usuarios;
};

var autenticar = function(login, senha) {
    var autenticado = usuarios.find(function(usuario) {
        return usuario.login === login && usuario.senha === senha;
    });

    console.log("Objeto autenticado: " + autenticado);
    return autenticado;
};

exports.cadastrar = cadastrar;
exports.listar = listar;
exports.autenticar = autenticar;