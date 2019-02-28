var bermudaTriangle = null;
var tipoForma = null;

var marker = null;
var map = null;

function initMap() {
  
  tipoForma = 0;

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: { lat: -12.079116, lng: -77.042365 },
    mapTypeId: 'terrain',
    disableDefaultUI: true
  });

  // Construct the polygon.
  generatePolygon();

  map.addListener('click', addLatLng);
}

function addLatLng(event) {

  if (tipoForma == 0) {

    if (marker !== null) {
      marker.setMap(null);
    }

    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });

    return;
  }

  bermudaTriangle.setMap(map);
  var path = bermudaTriangle.getPath();
  if (typeof path == 'undefined') {
    path = [];
    path.push(event.latLng);
    bermudaTriangle.setPath(path);
  }
  path.push(event.latLng);

}

function setFormType(forma) {

  if (tipoForma !== forma) {
    tipoForma = forma;
    cleanMapa();
  }

}

function cleanMapa() {

  if( marker != null ){
    marker.setMap(null);
  }

  if (bermudaTriangle !== null) {
    bermudaTriangle.setMap(null);
  }
  generatePolygon();
}

function generatePolygon() {

  // Define the LatLng coordinates for the polygon's path.
  var triangleCoords = [];

  bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    editable: true,
    fillOpacity: 0.35
  });

}


