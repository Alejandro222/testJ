var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var msj = '';
var email = '';

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/send', function (req, res, next) {
  console.log(req.body);
  // res.send(JSON.stringify(msj, null, 4));
  msj = req.body.message;
  email = req.body.email;

  sendEmail(email, msj).then(
   res.redirect('http://localhost:3000/')
  );

});

var sendEmail = function (from, message){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'driverzonecr@gmail.com',
      pass: 'Friendcompany'
    }
  });

  var mailOptions = {
    from: 'driverzonecr@gmail.com',
    cc:from,
    to: 'driverzonecr@gmail.com',
    subject: 'Consulta',
    text: 'hola' + message
  };

  return transporter.sendMail(mailOptions);
};


  



// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
module.exports = router;
