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
  postQuote: function(req, res, next) {
    var name = req.body.name;
    var phone = req.body.phone;
    var message = req.body.message;
    var email = req.body.email;
    var date = req.body.date;
    var item = req.body.item;
    var state= "2";

    var db = firebase.database();
    var newQuote = db.ref("quote").push();

    newQuote.set({
      name: name,
      phone: phone,
      email: email,
      message: message,
      date:date,
      item:item,
      state:state
    });
    return res.redirect('/');
    // console.log(message,name,phone);


  },
  getQuote: function(req, res, next) {


    res.render('quote/index', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });


  }


}
