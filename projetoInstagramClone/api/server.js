var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectId;
// library para manipulação e leitura de files
var fs = require('fs');

var app = express();

//bodyParser como middleware da application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* 
** Middleware para pegar o content-type do request
** preflight request, camada seg do navegador
*/
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
/* middleware
** enctype = application/x-www-form-urlencoded | uso padrao de envio form
** enctype = multipart/form-data               | uso para envio de form[file]
*/
app.use(multiparty());

var port = 3000;
app.listen(port, function () {
    console.log('Servidor HTTP rodando na porta: ' + port);
});

//conexao com Mongodb
var db = new mongodb.Db(
    'instagram', //banco de dados
    new mongodb.Server('localhost', 27017, {}), //obj de conexao com mongoDB
    {}
);

//incluindo rotas
app.get('/', function (req, res) {
    res.send({ msg: 'Olá' });
});
app.post('/api', function (req, res) {
    var url_imgem = new Date().getTime() + '_' + req.files.arquivo.originalFilename;
    var path_origem = req.files.arquivo.path;
    var path_destino = './uploads/' + url_imgem;

    fs.rename(path_origem, path_destino, function (err) {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        var dados = {
            url_imagem: url_imgem,
            titulo: req.body.titulo
        };

        db.open(function (err, mongoClient) {
            mongoClient.collection('postagens', function (err, collection) {
                collection.insert(dados, function (err, records) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(records);
                    }
                    mongoClient.close();
                });
            });
        });
    });
});
app.get('/api', function (req, res) {
    db.open(function (err, mongoClient) {
        mongoClient.collection('postagens', function (err, collection) {
            collection.find().toArray(function (err, results) {
                if (err) {
                    res.json(err);
                } else {
                    res.status(200).json(results);
                }
                mongoClient.close();
            });
        });
    });
});
app.get('/api/:id', function (req, res) {
    db.open(function (err, mongoClient) {
        mongoClient.collection('postagens', function (err, collection) {
            collection.find({ _id: objectId(req.params.id) }).toArray(function (err, results) {
                if (err) {
                    res.json(err);
                } else {
                    res.status(200).json(results);
                }
                mongoClient.close();
            });
        });
    });
});
app.get('/imagens/:imagem', function (req, res) {
    var img = req.params.imagem;

    fs.readFile('./uploads/' + img, function (err, content) {
        if (err) {
            res.status(400).json(err);
            return;
        }

        res.writeHead(200, { 'content-type': 'image/jpg' });
        res.end(content);
    });
});
app.put('/api/:id', function (req, res) {
    db.open(function (err, mongoClient) {
        mongoClient.collection('postagens', function (err, collection) {
            collection.update(
                { _id: objectId(req.params.id) }, //query de pesquisa
                {
                    $push: { // $push->vai incluir o comentario como array atualizando a postagem
                        comentarios: {
                            id_comentario: new objectId(),
                            comentario: req.body.comentario
                        }
                    }
                },
                {}, // mult, identifica se vai atualizar um ou todos os documentos
                function (err, records) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(records);
                    }
                    mongoClient.close();
                }
            );
        });
    });

});
app.delete('/api/:id', function (req, res) {

    db.open(function (err, mongoClient) {
        mongoClient.collection('postagens', function (err, collection) {
            collection.update(
                {}, //query de pesquisa (não precisamos fazer um filtro de documentos)
                {
                    $pull: { // $pull->vai remover um indice do array de comentarios
                        comentarios: { id_comentario: objectId(req.params.id) }
                    }
                },
                { multi: true }, // mult, identifica se vai atualizar um ou todos os documentos
                function (err, records) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(records);
                    }
                    mongoClient.close();
                });
        });
    });

});