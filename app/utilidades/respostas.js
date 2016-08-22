var responder = function(res, statusCode) {
    return function (resultado) {
        res.status(statusCode).json(resultado);
    };
};

var ok = function(res) {
    return responder(res, 200);
};

var criado = function(res) {
    return responder(res, 201);
};

var erro = function(res) {
    return responder(res, 400);
};

var tratar = function(tratarResultado, tratarErro) {
    return function (erro, resultado) {
        if (erro) {
            tratarErro(erro);
        } else {
            tratarResultado(resultado);
        }
    };
};

exports.ok = ok;
exports.criado = criado;
exports.erro = erro;
exports.tratar = tratar;