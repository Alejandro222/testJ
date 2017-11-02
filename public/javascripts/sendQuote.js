$(document).ready(function() {

  $("#send-message").click(function(event) {
    var name = $("#recipient-name").val();
    var phone = $("#recipient-phone").val();
    var email = $("#recipient-email").val();
    var message = $("#message-text").val();
    var date = new Date();
    var firstName = name;
    var item= $("#sel1").find("option:selected").val();


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
        date:date,
        item:item
      },
      cache: false,
      success: function() {
        // Success message
        $("#success").empty();
        $('#success')
          .append("<h3>Su cotización a sido enviada.! </h3>");

        //clear all fields
        $('#cotizacionForm').trigger("reset");
        $('#QuoteModal').modal('hide');
        // alert('se envio');
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
  });
  $("#close-modal").click(function(event) {
    clearInput();
  });

  // $('#name').focus(function() {
  //     $('#success').html('');
  // });
  function popUp() {
    // $('#open').click(function(){
    $('#popup').fadeIn('slow');
    $('.popup-overlay').fadeIn('slow');
    $('.popup-overlay').height($(window).height());
    return false;
    // });
  };
  $('#close').click(function() {
    $('#popup').fadeOut('slow');
    $('.popup-overlay').fadeOut('slow');
    return false;
  });

  function clearInput() {
    $('#cotizacionForm').trigger("reset");
  }
});
