var models = require('../models');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');


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
    sendEmail: function(req, res, next) {
        message = req.body.message;
        emailFrom = req.body.email;
        name = req.body.name;
        phone = req.body.phone;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'driverzonecr@gmail.com',
                pass: 'Friendcompany'
            }
        });

        var mailOptions = {
            from: 'driverzonecr@gmail.com',
            cc: 'driverzonecr@gmail.com',
            to: emailFrom,
            subject: 'Consulta Web',
            html: '<h3>Gracias por su consulta!</h3>' + '<strong> ' + name + '</strong>' + '<br>' + '<strong> ' + message +
                '</strong>' + '<br>' + '<h3>Pronto le responderemos!</h3>' + '<h1>Vidreos JARSOL </h1>' +
                '<h2>Teléfono: 2474 9898</h2>'

        };

        return transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('/');
            }
        });
    },

};