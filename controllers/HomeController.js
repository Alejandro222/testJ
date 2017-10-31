var firebase = require("firebase");
module.exports = {

    index: function(req, res, next) {
        res.render('index');
    },
    getMtsAluminio: function(req, res, next) {
        res.render('aluminio/index');
    },
    getMtsVidrio: function(req, res, next) {
        res.render('vidrio/index');
    },
    getMtsAccesorios: function(req, res, next) {
        res.render('accesorio/index');
    },
    postQuote: function (req,res,next) {
      var name = req.body.name;
      var phone = req.body.phone;
      var message = req.body.message;

      // var db =firebase.database();
      // var newQuote = db.ref("quote").push();
      //
      // newQuote.set({
      //   name: name,
      //   phone: phone,
      //   message: message
      // });
      return res.redirect('/');
      // console.log(message,name,phone);


    },
    getQuote: function (req,res,next) {
      var name = req.body.name;
      var phone = req.body.phone;
      var message = req.body.message;



    }


}
