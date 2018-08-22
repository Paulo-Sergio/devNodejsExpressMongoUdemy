module.exports.index = function (app, req, res) {

    //conexao
    var connection = app.config.dbConnection();

    //model
    var noticiasDAO = new app.app.models.NoticiasDAO(connection);

    noticiasDAO.get5UltimasNoticias(function (error, result) {
        res.render('home/index', { noticias: result });
    });
}