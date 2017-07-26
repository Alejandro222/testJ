var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jarsol' });
});

router.get('/aluminio', function(req, res) {
    res.render('aluminio/index');
});
router.get('/vidrio', function(req, res) {

    res.render('vidrio/index');
});
router.get('/accesorio', function(req, res) {

    res.render('accesorio/index');
});

module.exports = router;
