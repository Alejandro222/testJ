module.exports = {

    index: function(req, res, next) {
        res.render('index');
    },
    getMtsAluminio: function(req, res, next) {
        res.render('aluminio/index');
    },
    getMtsVidrio: function(req, res, next) {
        res.render('vidrio/index');
    },
    getMtsAccesorios: function(req, res, next) {
        res.render('accesorio/index');
    }


}