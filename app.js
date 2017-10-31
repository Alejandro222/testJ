var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var methodOverride = require('method-override');
// autenticacion
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
// images
var fileUpload = require('express-fileupload');

require('./passport/passport')(passport);
// firebase
var firebase = require('firebase');

firebase.initializeApp({
  serviceAccount: "jarsol-6d2f1e610f38.json",
  databaseURL:"https://jarsol-bc683.firebaseio.com"
});

var routes = require('./routes/routes');

// var index = require('./routes/index');
// var users = require('./routes/users');
// var materiales = require('./routes/materiales');
// var productos = require('./routes/productos');
// var admin = require('./routes/admin');


var app = express();
app.use(cookieParser());
app.use(session({
    secret: 'jarsolSecret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//para utilizar html
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
// app.use('/', index);
// app.use('/users', users);
// app.use('/admin', admin);
// app.use('/materiales', materiales);
// app.use('/productos', productos);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
