var models = require('../models');
var bcrypt = require('bcryptjs');

module.exports = {
    getSignIn: function(req, res, next) {
        return res.render('users/signin', {
            message: req.flash('info'),
            authMessage: req.flash('authMessage')
        });
    },


    getSignUp: function(req, res, next) {
        return res.render('users/signup', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },

    postSignUp: function(req, res, next) {
        var salt = bcrypt.genSaltSync(12);

        if (req.body.password == req.body.password_confirmation) {
            var password = bcrypt.hashSync(req.body.password, salt);
            var passwordConf = bcrypt.hashSync(req.body.password_confirmation, salt);

            var user = {
                name: req.body.name,
                email: req.body.email,
                password: password,
                passwordConf: passwordConf
            };

            var user = models.users.create(user);
            res.format({
                json: function() {
                    user.then(user => {
                        res.json(user);
                    });
                },
                html: function() {
                    user.then(user => {
                        req.flash('info', 'Registrado Correcta!!');
                        res.redirect('/user/signin');
                    });
                }
            });

        } else {
            //no macht password
            return;
        }



        return;



    },

    profile: function(req, res, next) {
        res.render('users/profile', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });

    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/user/signin');
    },



}