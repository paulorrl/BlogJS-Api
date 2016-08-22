var router = require('express').Router();
var postController = require('./controller');

router.post('/v1/posts/:postId/comentarios', postController.adicionarComentario);
router.get('/v1/posts', postController.listarTodos);
router.get('/v1/posts/:postId', postController.buscarPorId);
router.get('/v1/usuarios/:usuarioId/posts', postController.listarPorUsuario);
router.get('/v1/usuarios/:usuarioId/posts/:postId', postController.buscarPorDonoEId);
router.post('/v1/usuarios/:usuarioId/posts', postController.cadastrar);
router.put('/v1/usuarios/:usuarioId/posts/:postId', postController.atualizar);

module.exports = router;