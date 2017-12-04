$(document).ready(function() {
     
  $("#send-quote").click(function() {        
    $(".error-style").remove();        
    if ($("#recipient-name").val() == "") {            
      $("#recipient-name").focus().after("<span class='error-style'>Ingrese su nombre</span>");            
      return false;        
    } else if ($("#recipient-contact").val() == "") {           
      $("#recipient-contact").focus().after("<span class='error-style'>Ingrese un número de teléfono o Email</span>");            
      return false;        
    } else if ($("#message-text").val() == "") {            
      $("#message-text").focus().after("<span class='error-style'>Ingrese un mensaje</span>");            
      return false;        
    }    
    else {
      // si todo esta bien, se envian los datos
      var name = $("#recipient-name").val();
      var contact = $("#recipient-contact").val();
      var message = $("#message-text").val();
      var item = $("#sel1").find("option:selected").val();

      var date = new Date();
      var firstName = name;
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }

      $.ajax({
        url: "/quote/send",
        type: "POST",
        data: {
          name: name,
          contact: contact,
          message: message,
          date: date,
          item: item
        },
        cache: false,
        success: function() {
          // Success message
          $("#success").empty();
          $('#success')
            .append("<h3>Su cotización ha sido enviada! Pronto le responderemos. </h3>");

          //clear all fields
          $('#cotizacionForm').trigger("reset");
          $('#QuoteModal').modal('hide');
          popUp();
        },
        error: function() {
          $('.content-popup')
            .append($("<h3>").text("Disculpe " + firstName + ",problemas con el envio de datos, intente de nuevo!"));
          //clear all fields
          $('#cotizacionForm').trigger("reset");
          $('#QuoteModal').modal('hide');
          popUp();
        },
      });
      $("#close-modal").click(function(event) {
        clearInput();
      });

      function popUp() {
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
      };
      $('#close').click(function() {
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
      });

      function clearInput() {
        $('#cotizacionForm').trigger("reset");
      }
    }
  });    
  $("#recipient-name, #message-text, #recipient-contact").keyup(function() {        
    if ($(this).val() != "") {            
      $(".error").fadeOut();            
      return false;        
    }    
  });    
});
