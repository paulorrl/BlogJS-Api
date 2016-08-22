var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var roteadorPost = require('./post/roteador');
var roteadorUsuario = require('./usuario/roteador');
require('./libs/mongodb');

var porta = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(cors());

app.use(roteadorPost);
app.use(roteadorUsuario);

app.listen(porta, function() {
    console.log("BlogJS - API no ar na porta: " + porta);
});