var router = require('express').Router();
var usuarioController = require('./controller');

router.get('/v1/usuarios', usuarioController.listar);
router.get('/v1/usuarios/:id', usuarioController.buscar);
router.post('/v1/usuarios', usuarioController.cadastrar);
router.post('/v1/usuarios/auth', usuarioController.autenticar);

module.exports = router;