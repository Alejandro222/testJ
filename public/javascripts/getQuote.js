  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDkM08lznDQc80bVx6N1o5hM95-TYoQ9Qk",
    authDomain: "jarsol-bc683.firebaseapp.com",
    databaseURL: "https://jarsol-bc683.firebaseio.com",
    projectId: "jarsol-bc683",
    storageBucket: "jarsol-bc683.appspot.com",
    messagingSenderId: "538498349431"
  };
  // Initialize DB
  firebase.initializeApp(config);
  var db = firebase.database();
  var ref = db.ref("quote");
  // create event to access a data
  var cantInit = 10;

  function createArticle() {
    ref.on("child_added", function(snapshot) {
      var cantElement = snapshot.key.length;
      console.log('se agrego uno nuevo');
      if (cantInit == cantElement) {
        Push.create("Nueva Cotización!", {
          body: "Ha ingresado una nueva Cotización",
          icon: './images/jarsolazul.png',
          timeout: 8000,
          onClick: function() {
            window.focus();
            this.close();
          }
        });
        cantInit = 0;
        cantElement =0;
      }else {
        cantInit += 10;

      }

      var elem = $(document.createElement('article'));

      if (snapshot.val().state == 1) {
        elem.attr('class', 'article-style state' + snapshot.val().state);
      } else {
        elem.attr('class', 'article-style state' + snapshot.val().state);
      }
      elem.html(HTMLQuote(snapshot.val(), snapshot.key)).appendTo('#content-quote');
      // add event to button
      $(".success-1").click(function(event) {
        var id = event.target.id;
        changeStateQuote(id, 1);
      });
      $(".danger-0").click(function(event) {
        var id = event.target.id;
        changeStateQuote(id, 0);
      });
      $(".bnt-delete").click(function(event) {
        var id = event.target.id;
      ref.child(id).remove();
      location.reload();
      
      });

      // update state
      function changeStateQuote(id, state) {
        db.ref().child('/quote/' + id).update({
          state: state,
        });
        location.reload();
      };
      $(document).ready(function() {
        $('.state1').css({
          'background-color': '#1ed077b5'
        });

        $('.state0').css({
          'background-color': '#c7203fba'

        });
      });
      $('.article-style').css({
        'background-color': '#158bc5a6'
      });



    }, function(error) {
      console.log("Error: " + error.code);
    });
  };


  function HTMLQuote(data, id) {
    var content = "<h3> Nombre:  " + data.name + "</h3>";
    content += "<h3> Tipo de Consulta:  " + data.item + "</h3>";
    content += "<h3> Email:  " + data.email + "</h3>";
    content += "<h3> Teléfono:  " + data.phone + "</h3>" + "<h3>" + "Mensaje:" + "</h3> <hr>" + "<h3 class='text-center'>" + data.message + "</h3><hr>";
    content += "<h3> Acción:</h3>";
    content += "  <button type='button' class='btn btn-success success-1' id='" + id + "'>Realizada</button>";
    content += "<button type='button' class='btn btn-info danger-style danger-0' id='" + id + "'>Indefinida</button>";
    content += "<button type='button' class='btn btn-danger danger-style bnt-delete' id='" + id + "'>Eliminar Registro</button>";
    content += "<h3> Fecha:  " + data.date + "</h3>";
    return content;
  };


  // Push.clear();

  // cambios en un item
  ref.on("child_changed", function(snapshot) {
    var elem = $('#' + snapshot.key);
    elem.html(HTMLQuote(snapshot.val()));
  });
  createArticle();
