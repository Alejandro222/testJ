var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Jarsol' });
// });

router.get('/', function(req, res) {
    res.render('producto/index');
});

module.exports = router;
