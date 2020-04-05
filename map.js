var map;

var centerLocation = {lat: 4.2105, lng: 101.9758}

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
  hLocate()

}

function setMarker(location, tag){

  //Custom markersbase
  var hospital = {

    path: google.maps.SymbolPath.CIRCLE,
    scale: 5,
    fillColor: "steelblue",
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

  if(tag == "hospital"){

    var marker = new google.maps.Marker({

      position: {lat: parseFloat(location.lat), lng: parseFloat(location.long)},
      map: map,
      icon: hospital

    });

  }

  google.maps.event.addListener(marker, 'click', function() {

  });


}

function hLocate(){

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
