var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var bcrypt = require('bcryptjs');


module.exports = function(passport) {
    var criteria = function(email) {
        return {
            where: {
                email: email
            }
        };
    }
    passport.serializeUser(function(user, done) {
        done(null, user);

    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    passport.use(new LocalStrategy({

        passReqToCallback: true
    }, function(req, email, password, done) {

        console.log(email);
        var user = models.users.findOne(criteria(email));
        if (user.length > 0) {
            user.then(user => {
                if (bcrypt.compareSync(password, user.password)) {
                    return done(null, {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    });
                }
                return done(null, false, req.flash('authMessage', 'Email o Contraseña incorrecta!'));

            });
        }
        return done(null, false, req.flash('authMessage', 'No existe el usuario'));

    }));

};