var Post = require('./modelo');

var cadastrar = function(post, quandoSalvar, quandoDerErro) {
    new Post(post).save(function(err, resultado) {
        if (err) {
            quandoDerErro(err);
        } else {
            quandoSalvar(resultado);
        }
    });
};

var atualizar = function(novoPost, quandoAtualizar, quandoDerErro) {
    Post.findOne({_id:novoPost.id, dono:novoPost.dono})
        .exec(function(err, post) {
            if (err) {
                quandoDerErro(err);
            } else {
                post.titulo = novoPost.titulo;
                post.conteudo = novoPost.conteudo;
                post.save(function(erro, resultado) {
                    if (erro) {
                        quandoDerErro(erro);
                    } else {
                        quandoAtualizar(post);
                    }
                });
            }
        });
};

var buscarPorDonoEId = function(postId, donoId, quandoEncontrar, quandoDerErro) {
    Post.findOne({ _id:postId, dono:donoId })
        .exec(function(err, post) {
            if (err) {
                quandoDerErro(err);
            } else {
                quandoEncontrar(post);
            }
        });
};

var buscarPorId = function(postId, quandoEncontrar, quandoDerErro) {
    Post.findById(postId)
        .exec(function(err, post) {
            if (err) {
                quandoDerErro(err);
            } else {
                quandoEncontrar(post);
            }
        });
};

var listarPorUsuario = function(usuarioId, quandoListar, quandoDerErro) {
    Post.find({ dono:usuarioId })
        .exec(function(err, posts) {
            if (err) {
                quandoDerErro(err);
            } else {
                quandoListar(posts);
            }
        });
};

var listarPorTitulo = function(pagina, maximoItens, titulo, quandoListar, quandoDerErro) {
    Post.paginate({ titulo:new RegExp(titulo, "i") }, {page:pagina, limit:maximoItens}, function(err, posts) {
            if (err) {
                quandoDerErro(err);
            } else {
                quandoListar(posts);
            }
        });
};

var listarTodos = function(pagina, maximoItens, quandoListar, quandoDerErro) {
    Post.paginate({}, {page:pagina, limit:maximoItens}, function(err, posts) {
            if (err) {
                quandoDerErro(err);
            } else {
                quandoListar(posts);
            }
        });
};

var adicionarComentario = function(postId, comentario, quandoAdicionar, quandoDerErro) {
    Post.findById(postId)
        .exec(function(err, post) {
            if (err) {
                quandoDerErro(err);
            } else {
                post.comentarios.push({usuario:comentario.email,conteudo:comentario.conteudo});
                post.save(function(erro) {
                    if (erro) {
                        quandoDerErro(erro);
                    } else {
                        quandoAdicionar(post);
                    }
                });
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