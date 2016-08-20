var Post = require('./modelo');

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

var cadastrar = function(post, quandoSalvar, quandoDerErro) {
    new Post(post).save(function(err, resultado) {
        if (err) {
            quandoDerErro(err);
        } else {
            quandoSalvar(resultado);
        }
    });
};

var buscar = function(postId, donoId, quandoEncontrar, quandoDerErro) {
    Post.findOne({ _id:postId, dono:donoId })
        .exec(function(err, post) {
            if (err) {
                quandoDerErro(err);
            } else {
                quandoEncontrar(post);
            }
        });
};

exports.listarPorUsuario = listarPorUsuario;
exports.cadastrar = cadastrar;
exports.buscar = buscar;