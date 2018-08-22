module.exports = function (app) {
    app.get("/noticias", function (req, res) {
        app.app.controllers.noticias.noticiasController(app, req, res);
    });

    app.get('/noticia', function (req, res) {
        app.app.controllers.noticias.noticiaController(app, req, res);
    });
};