var map;
var UserLocation;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {

  var mapOptions = {
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // find place related to office.
  // find closest coffee shops in and around location. 
  // check all routes with "waypoints"

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(UserLocationFinder, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

}

function calcRoute() {
  var start = UserLocation;
  var end = "282 2nd Street 4th floor, San Francisco, CA 94105";
    
    /
    var waypts = [];
    var checkboxArray = document.getElementById("waypoints");
    for (var i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected == true) {
        waypts.push({
          location:checkboxArray[i].value,
          stopover:true
        });
      }
    }
    /
  var selectedMODEbyUSER = document.getElementById("mode").value;
  var request = {
    origin: start,
    destination: end,
    //waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode[selectedMODEbyUSER]
  };

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

var UserLocationFinder = function(position) {
    UserLocation = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: UserLocation,
        content: 'Location found using HTML5.'
      });

      map.setCenter(UserLocation);
  }



function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(37.8759, -122.2806),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
