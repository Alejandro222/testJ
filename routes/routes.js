var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var authMiddleware = require('../middleware/auth');

router.get('/', controllers.HomeController.index);
//router users
router.get('/user/signin', controllers.UserController.getSignIn);

router.post('/user/signin', passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true

}));
router.get('/user/logout', controllers.UserController.logout);
router.get('/user/profile', authMiddleware.isLogged, controllers.UserController.profile);
router.get('/user/signup', authMiddleware.isLogged, controllers.UserController.getSignUp);
router.post('/user/signup', authMiddleware.isLogged, controllers.UserController.postSignUp);

// routes images
router.post('/image', authMiddleware.isLogged, controllers.ImageController.postImage);
router.get('/image', authMiddleware.isLogged, controllers.ImageController.getImage);
router.get('/image/proyectos', authMiddleware.isLogged, controllers.ImageController.getImageProyecto);
// routes send email
router.post('/user/send', controllers.UserController.sendEmail);

//materiales

controllers.HomeController.index
router.get('/materiales/aluminio', controllers.HomeController.getMtsAluminio);
router.get('/materiales/vidrio', controllers.HomeController.getMtsVidrio);
router.get('/materiales/accesorio', controllers.HomeController.getMtsAccesorios);

//sendQuote
router.post('/quote/send', controllers.HomeController.postQuote);

router.get('/quote', controllers.HomeController.getQuote);
// authMiddleware.isLogged,


module.exports = router;
