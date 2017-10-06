var express = require('express');
var router = express.Router();
var passport = require('passport'); 
var controllers = require('.././controllers');
var authMiddleware = require('../middleware/auth');

router.get('/',controllers.HomeController.index);
//router users
router.get('/user/signin',controllers.UserController.getSignIn);

router.post('/user/signin', passport.authenticate('local',{
    successRedirect : '/user/profile',
    failureRedirect : '/user/signin',
    failureFlash : true

}));
router.get('/user/logout',controllers.UserController.logout);
router.get('/user/profile',authMiddleware.isLogged ,controllers.UserController.profile);


router.get('/user/signup',controllers.UserController.getSignUp);
router.post('/user/signup',controllers.UserController.postSignUp);







module.exports = router;
