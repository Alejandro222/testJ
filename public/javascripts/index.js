$(document).ready(function() {

$("#send-message").click(function(event) {
  var name= $("#recipient-name").val();
  var phone =$("#recipient-phone").val();
  var message = $("#message-text").val();

  alert(message);
  clearInput();
});

$("#close-modal").click(function(event) {
  clearInput();
});

function clearInput() {
   $("#recipient-name").val("");
   $("#recipient-phone").val("");
   $("#message-text").val("");
}







});
