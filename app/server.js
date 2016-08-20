var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Credenciais: usuário:senha
mongoose.connect('mongodb://prrl:prrl@ds053164.mlab.com:53164/blogjs');

app.use(bodyParser.json());
app.use(cors());

var usuarioController = require('./usuario/controller');
var postController = require('./post/controller');

app.get('/v1/usuarios', usuarioController.listar);
app.get('/v1/usuarios/:id', usuarioController.buscar);
app.post('/v1/usuarios', usuarioController.cadastrar);
app.post('/v1/usuarios/auth', usuarioController.autenticar);

app.get('/v1/usuarios/:usuarioId/posts', postController.listarPorUsuario);
app.get('/v1/usuarios/:usuarioId/posts/:postId', postController.buscar);
app.post('/v1/usuarios/:usuarioId/posts', postController.cadastrar);

app.listen(9000, function() {
    console.log("BlogJS API no ar, porta 9000 ...");
});