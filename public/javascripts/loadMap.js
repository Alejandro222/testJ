// google maps
function initMap() {
      var jarsol = {lat: 10.375621, lng: -84.353917};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: jarsol
      });
      var marker = new google.maps.Marker({
        position: jarsol,
        map: map
      });
    }
