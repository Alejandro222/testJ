var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var bcrypt = require('bcryptjs');

module.exports = function(passport) {
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
        var user = models.users;
        user.findOne({
            // where: {email: { [Op.eq]: email }}
            where: {email: email}
        }).then(user => {
            if (user != null) {
                if (bcrypt.compareSync(password, user.password)) {
                    return done(null, {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    });
                }
                return done(null, false, req.flash('authMessage', 'Email o Contraseña incorrecta!'));


            } else {
                return done(null, false, req.flash('authMessage', 'No existe el usuario'));
            }
        });
    }));

};
