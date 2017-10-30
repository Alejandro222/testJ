$(document).ready(function() {

$("#send-message").click(function(event) {
  var name= $("#recipient-name").val();
  var phone =$("#recipient-phone").val();
  var message = $("#message-text").val();
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
          message: message
      },
      cache: false,
      success: function() {
          // Success message
          // $('.content-popup').html("<div class='alert alert-success'>");
          // $('.content-popup > .alert-success');
          // // .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          // //     .append("</button>");
          // $('.content-popup > .alert-success')
          //     .append("<strong>Su cotización a sido enviada. </strong>");
          // $('.content-popup > .alert-success')
          //     .append('</div>');
          $('.content-popup')
              .append("<h3>Su cotización a sido enviada. </h3>");

          //clear all fields
          $('#cotizacionForm').trigger("reset");
          $('#QuoteModal').modal('hide');
          // alert('se envio');
          popUp();
      },
      error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Disculpe " + firstName + ",problemas con el envio de datos, intente de de nuevo!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#cotizacionForm').trigger("reset");
          $('#cotizacionForm').modal('hide');

          alert('no se envio');

      },
  });
});
$("#close-modal").click(function(event) {
  clearInput();
});

$('#name').focus(function() {
    $('#success').html('');
});
function popUp() {
  // $('#open').click(function(){
      $('#popup').fadeIn('slow');
      $('.popup-overlay').fadeIn('slow');
      $('.popup-overlay').height($(window).height());
      return false;
  // });
};
$('#close').click(function(){
    $('#popup').fadeOut('slow');
    $('.popup-overlay').fadeOut('slow');
    return false;
});

function clearInput() {
  $('#cotizacionForm').trigger("reset");

}

});
