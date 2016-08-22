var posts = require('./posts');
var respostas = require('../utilidades/respostas');

var cadastrar = function(req, res) {
    var post = req.body;
    post.dono = req.params.usuarioId;

    posts.cadastrar(post, respostas.criado(res), respostas.erro(res));
};

var atualizar = function(req, res) {
    var post = req.body;
    post.id = req.params.postId;
    post.dono = req.params.usuarioId;

    posts.atualizar(post, respostas.ok(res), respostas.erro(res));
};

var buscarPorDonoEId = function(req, res) {
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;

    posts.buscarPorDonoEId(postId, usuarioId, respostas.ok(res), respostas.erro(res));
};

var buscarPorId = function(req, res) {
    var postId = req.params.postId;

    posts.buscarPorId(postId, respostas.ok(res), respostas.erro(res));
};

var listarPorUsuario = function(req, res) {
    var usuarioId = req.params.usuarioId;

    posts.listarPorUsuario(usuarioId, respostas.ok(res), respostas.erro(res));
};

var listarTodos = function(req, res) {
    var titulo = req.query.titulo;
    var pagina = req.query.pagina || 1;
    var maximoItens = req.query.maximoItens || 5;

    if (titulo) {
        posts.listarPorTitulo(pagina, maximoItens, titulo, respostas.ok(res), respostas.erro(res));
    } else {
        posts.listarTodos(pagina, maximoItens, respostas.ok(res), respostas.erro(res));
    }
};

var adicionarComentario = function(req, res) {
    var postId = req.params.postId;
    var comentario = req.body;

    if (comentario && comentario.conteudo && comentario.email) {
        posts.adicionarComentario(postId, comentario, respostas.criado(res), respostas.erro(res));
    } else {
        respostas.erro(res)({mensagem:'Comentário inválido!'});
    }
};

exports.cadastrar = cadastrar;
exports.atualizar = atualizar;
exports.buscarPorDonoEId = buscarPorDonoEId;
exports.buscarPorId = buscarPorId;
exports.listarPorUsuario = listarPorUsuario;
exports.listarTodos = listarTodos;
exports.adicionarComentario = adicionarComentario;