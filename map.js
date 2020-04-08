var map;

var centerLocation = {lat: 4.2105, lng: 101.9758}

var currLocation = [];
var currCircle = [];

function geoLocate(controlDiv, map, center){

  var control = this;

  // Set the center property upon construction
  control.center_ = center;
  controlDiv.style.clear = 'both';
  controlDiv.style.width = '40px';
  controlDiv.style.margin = '10px';

  // Set CSS for border
  var geoLocateUI = document.createElement('div');
  geoLocateUI.style.backgroundColor = '#fff';
  geoLocateUI.style.padding = '0px';
  geoLocateUI.style.border = '2px solid #fff';
  geoLocateUI.style.borderRadius  = '2px';
  geoLocateUI.style.boxShadow  = 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px';
  geoLocateUI.style.cursor = 'pointer';
  geoLocateUI.style.textAlign = 'center';
  geoLocateUI.id = 'geoLocateUI';
  geoLocateUI.title = 'Click to recenter the map';
  controlDiv.appendChild(geoLocateUI);

  // Set CSS for interior
  var geoLocateText = document.createElement('div');
  geoLocateText.style.color = 'rgb(25,25,25)';
  geoLocateText.style.fontFamily = 'Roboto,Arial,sans-serif';
  geoLocateText.style.fontSize = '16px';
  geoLocateText.style.lineHeight = '38px';
  geoLocateText.style.paddingLeft = '5px';
  geoLocateText.style.paddingRight = '5px';
  geoLocateText.id = 'geoLocateText';
  geoLocateText.innerHTML = '<i class="fa fa-map-marker"></i>';
  geoLocateUI.appendChild(geoLocateText);

  // Set up the click event listener for 'Center Map': Set the center of
  // the map
  // to the current center of the control.
  geoLocateUI.addEventListener('click', function() {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function(position) {

        var current = {

          lat: position.coords.latitude,
          long: position.coords.longitude

        }

        setMarker(current, "current");
        map.setZoom(13);
        map.setCenter(new google.maps.LatLng(current.lat, current.long));

      });

    }

  });

}

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {

    center: centerLocation,
    zoom: 8,
    mapTypeControl: false,
    streetViewControl: false,
    styles:
    [
      {
        "elementType": "geometry",
        "stylers": [{"color": "#f5f5f5"}]
      },
      {
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#616161"}]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{"color": "#f5f5f5"}]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#bdbdbd"}]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "poi",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#eeeeee"}]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#757575"}]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"color": "#e5e5e5"}]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#9e9e9e"}]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"color": "#ffffff"}]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#757575"}]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{"color": "#dadada"}]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#616161"}]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#9e9e9e"}]
      },
      {
        "featureType": "transit",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{"color": "#e5e5e5"}]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{"color": "#eeeeee"}]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#c9c9c9"}]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#9e9e9e"}]
      }
    ]

  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor
  // passing in this DIV.
  var geoLocateDiv = document.createElement('div');
  var centerControl = new geoLocate(geoLocateDiv, map, centerLocation);

  geoLocateDiv.index = 1;
  geoLocateDiv.style['padding-top'] = '10px';
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(geoLocateDiv);

  locate()

}

function setMarker(location, tag){

  //Custom markersbase
  var current= {

    path: google.maps.SymbolPath.CIRCLE,
    scale: 5,
    fillColor: "#51b882",
    fillOpacity: 0.7,
    strokeOpacity: 1.0,
    strokeWeight: 1,
    strokeColor: '#92d6b2'

  }

  var hospital = {

    path: google.maps.SymbolPath.CIRCLE,
    scale: 5,
    fillColor: "#5b78bd",
    fillOpacity: 1.0,
    strokeOpacity: 0.0

  }

  var uReport = {

    path: google.maps.SymbolPath.CIRCLE,
    scale: 5,
    fillColor: "crimson",
    fillOpacity: 1.0,
    strokeOpacity: 0.0

  }

  switch (tag) {

    case "hospital":

      var marker = new google.maps.Marker({

        position: {lat: parseFloat(location.lat), lng: parseFloat(location.long)},
        icon: hospital

      });

      marker.setMap(map);

    break;

    case "current":

      var marker;

      if(currLocation.length && currCircle.length != 0){

        currLocation[0].setMap(null);
        currCircle[0].setMap(null);
        currLocation = [];
        currCircle = [];

      }

      marker = new google.maps.Marker({

        position: {lat: parseFloat(location.lat), lng: parseFloat(location.long)},
        map: map,
        icon: current

      });

      currLocation.push(marker);

      var circleRange = new google.maps.Circle({

            strokeOpacity: 0.0,
            strokeWeight: 2,
            fillColor: '#aff0ce',
            fillOpacity: 0.35,
            map: map,
            center: {lat: parseFloat(location.lat), lng: parseFloat(location.long)},
            radius: 10000

      });

      currCircle.push(circleRange)

    break;

  }

}

function locate(){

  var request = new XMLHttpRequest()

  request.open("GET", "https://api.coronatracker.com/v1/healthcare-institution", true)

  request.onload = function(){

    var data = JSON.parse(this.response)

    for(var i = 0; i < data.hospitalsAndHealthcareProviders.length; i++){

      if(data.hospitalsAndHealthcareProviders[i].country == "MY"){

        setMarker(data.hospitalsAndHealthcareProviders[i], "hospital");

      }

    }

  }

  request.send()

}

function searchPlace(){

  var searchItem = document.getElementById('search_field').value;


}
