var models = require('../models');

module.exports = {

    index: function(req, res, next) {
        res.render('index');
    },
    postImage: function(req, res, next) {

        if (req.files) {
            var picture = req.files.picture;
            req.body.picture = '/images/' + picture.name;
        }
        var images = models.images.create(req.body);
        res.format({
            json: function() {
                images.then(images => {
                    res.json(images);
                });
            },
            html: function() {
                console.log(picture.name);
                picture.mv('public/images/' + picture.name, function(err) {
                    if (err)
                        return res.status(500).send(err);
                    images.then(images => {
                        res.render('images/proyectos', { image: picture.name });
                    });
                });
            }
        })
    },
    getImage: function(req, res, next) {
        res.render('images/new');
    },
    getImageProyecto: function(req, res, next) {

        var images = models.images.findAll();

        res.format({
            json: function() {
                res.json({ images: images });
            },
            html: function() {
                images.then(images => {
                    res.render('images/proyectos', { images: images });
                })
            }
        });





    }

}