$(document).ready(function() {
    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;    
    $("#send-message").click(function() {        
      $(".error").remove();        
      if ($("#recipient-name").val() == "") {            
        $("#recipient-name").focus().after("<span class='error'>Ingrese su nombre</span>");            
        return false;        
      } else if ($("#recipient-phone").val() == "") {            
        $("#recipient-phone").focus().after("<span class='error'>Ingrese un número de teléfono</span>");            
        return false;        
      } else if ($("#recipient-email").val() == "" || !emailreg.test($("#recipient-email").val())) {            
        $("#recipient-email").focus().after("<span class='error'>Ingrese un email correcto</span>");            
        return false;        
      } else if ($("#message-text").val() == "") {            
        $("#message-text").focus().after("<span class='error'>Ingrese un mensaje</span>");            
        return false;        
      }    
    else  {
      // si todo esta bien, se envian los datos
        var name = $("#recipient-name").val();
        var phone = $("#recipient-phone").val();
        var email = $("#recipient-email").val();
        var message = $("#message-text").val();
        var item = $("#sel1").find("option:selected").val();

          var date = new Date();
          var firstName = name;
          if (firstName.indexOf(' ') >= 0) {
            firstName = name.split(' ').slice(0, -1).join(' ');
          }

          $.ajax({
            url: "http://localhost:3000/quote/send",
            type: "POST",
            data: {
              name: name,
              phone: phone,
              email: email,
              message: message,
              date: date,
              item: item
            },
            cache: false,
            success: function() {
              // Success message
              $("#success").empty();
              $('#success')
                .append("<h3>Su cotización ha sido enviada! </h3>");

              //clear all fields
              $('#cotizacionForm').trigger("reset");
              $('#QuoteModal').modal('hide');
              popUp();
            },
            error: function() {
              $('.content-popup')
                .append($("<h3>").text("Disculpe " + firstName + ",problemas con el envio de datos, intente de de nuevo!"));
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
    $("#recipient-name, #message-text, #recipient-phone").keyup(function() {        
      if ($(this).val() != "") {            
        $(".error").fadeOut();            
        return false;        
      }    
    });    
    $("#recipient-email").keyup(function() {        
      if ($(this).val() != "" && emailreg.test($(this).val())) {            
        $(".error").fadeOut();            
        return false;        
      }    
    });
});
