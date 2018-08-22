var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectId;

var app = express();

//bodyParser como middleware da application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    var dados = req.body;

    db.open(function (err, mongoClient) {
        mongoClient.collection('postagens', function (err, collection) {
            collection.insert(dados, function (err, records) {
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
app.get('/api', function (req, res) {
    db.open(function (err, mongoClient) {
        mongoClient.collection('postagens', function (err, collection) {
            collection.find().toArray(function (err, results) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(results);
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
app.put('/api/:id', function (req, res) {
    db.open(function (err, mongoClient) {
        mongoClient.collection('postagens', function (err, collection) {
            collection.update(
                { _id: objectId(req.params.id) }, //query de pesquisa
                { $set: { titulo: req.body.titulo } }, // instrucao de atualizacao do(s) documeto(s)
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
            collection.remove({ _id: objectId(req.params.id) }, function (err, records) {
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