var bermudaTriangle ;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 24.886, lng: -70.268},
        mapTypeId: 'terrain',
        disableDefaultUI: true
      });

      // Define the LatLng coordinates for the polygon's path.
      var triangleCoords = [ ];

      // Construct the polygon.
      bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        editable: true,
        fillOpacity: 0.35
      });

      bermudaTriangle.setMap(map);

      map.addListener('click', addLatLng);
  }

  function addLatLng(event) {
    var path = bermudaTriangle.getPath();

    if( typeof path == 'undefined' ){
        path = [];
        path.push(event.latLng);
        bermudaTriangle.setPath( path );
    }

    path.push(event.latLng);

    var marker = new google.maps.Marker({
      position: event.latLng,
      title: '#' + path.getLength(),
      map: map
    });
  }
