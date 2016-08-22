var Post = require('./modelo');
var respostas = require('../utilidades/respostas');

var cadastrar = function(post, quandoSalvar, quandoDerErro) {
    new Post(post).save(respostas.tratar(quandoSalvar, quandoDerErro));
};

var atualizarDadosPost = function(post, novoPost, quandoAtualizar, quandoDerErro) {
    post.titulo = novoPost.titulo;
    post.conteudo = novoPost.conteudo;

    post.save(function(erro, resultado) {
        if (erro) {
            quandoDerErro(erro);
        } else {
            quandoAtualizar(post);
        }
    });
};

var atualizar = function(novoPost, quandoAtualizar, quandoDerErro) {
    Post.findOne({_id:novoPost.id, dono:novoPost.dono})
        .exec(function(err, post) {
            if (err) {
                quandoDerErro(err);
            } else {
                atualizarDadosPost(post, novoPost, quandoAtualizar, quandoDerErro);
            }
        });
};

var buscarPorDonoEId = function(postId, donoId, quandoEncontrar, quandoDerErro) {
    Post.findOne({ _id:postId, dono:donoId })
        .exec(respostas.tratar(quandoEncontrar, quandoDerErro));
};

var buscarPorId = function(postId, quandoEncontrar, quandoDerErro) {
    Post.findById(postId)
        .exec(respostas.tratar(quandoEncontrar, quandoDerErro));
};

var listarPorUsuario = function(usuarioId, quandoListar, quandoDerErro) {
    Post.find({ dono:usuarioId })
        .exec(respostas.tratar(quandoListar, quandoDerErro));
};

var listarPorTitulo = function(pagina, maximoItens, titulo, quandoListar, quandoDerErro) {
    var query = { titulo:new RegExp(titulo, "i") };
    var paginacao = {page:pagina, limit:maximoItens};
    Post.paginate(query, paginacao, respostas.tratar(quandoListar, quandoDerErro));
};

var listarTodos = function(pagina, maximoItens, quandoListar, quandoDerErro) {
    Post.paginate({}, {page:pagina, limit:maximoItens}, respostas.tratar(quandoListar, quandoDerErro));
};

var setarNovoComentario = function(post, comentario, quandoAdicionar, quandoDerErro) {
    post.comentarios.push({usuario:comentario.email,conteudo:comentario.conteudo});
    post.save(function(erro) {
        if (erro) {
            quandoDerErro(erro);
        } else {
            quandoAdicionar(post);
        }
    });
};

var adicionarComentario = function(postId, comentario, quandoAdicionar, quandoDerErro) {
    Post.findById(postId)
        .exec(function(err, post) {
            if (err) {
                quandoDerErro(err);
            } else {
                setarNovoComentario(post, comentario, quandoAdicionar, quandoDerErro);
            }
        });
};

exports.cadastrar = cadastrar;
exports.atualizar = atualizar;
exports.buscarPorDonoEId = buscarPorDonoEId;
exports.buscarPorId = buscarPorId;
exports.listarPorUsuario = listarPorUsuario;
exports.listarPorTitulo = listarPorTitulo;
exports.listarTodos = listarTodos;
exports.adicionarComentario = adicionarComentario;