var polygon = null;
var tipoForma = null;
var georssLayer = null;

var marker = null;
var map = null;

var objectMarker = null;
var objectPolygon = null;

function initMap() {

    tipoForma = 0;

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: -12.079116, lng: -77.042365 },
        mapTypeId: 'hybrid',
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

        objectMarker = { position: event.latLng };
        marker = new google.maps.Marker(objectMarker);
        marker.setMap(map);

        return;
    }

    polygon.setMap(map);
    var path = polygon.getPath();
    if (typeof path == 'undefined') {
        path = [];
        path.push(event.latLng);
        polygon.setPath(path);
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
    if (marker != null) {
        marker.setMap(null);
        marker = null;
    }

    if (polygon !== null) {
        polygon.setMap(null);
        polygon = null;
    }

    if (georssLayer != null) {
        georssLayer.setMap(null);
        georssLayer = null;
    }
    generatePolygon();
}

function generatePolygon() {
    var triangleCoords = [];

    objectPolygon = {
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        editable: true,
        fillOpacity: 0.35
    };

    polygon = new google.maps.Polygon(objectPolygon);
}

function loadMapByURL(url) {
    cleanMapa();
    georssLayer = new google.maps.KmlLayer({ url: url });
    georssLayer.setMap(map);
}

function loadMap(data) {

    var jsonData = JSON.parse(data);

    if (jsonData.tipo == 0) {
        loadMapaByData(jsonData.valor);
        return;
    }

    loadMapByURL(jsonData.valor)
}

function loadMapaByData(data) {

    // Marker
    if (data.tipoForma == 0) {
        objectMarker = data.objectData;
        marker = new google.maps.Marker(objectMarker);
        marker.setMap(map);
    }

    // Poligono
    if (data.tipoForma == 1) {
        objectPolygon = data.objectData;
        polygon = new google.maps.Polygon(objectPolygon);
        polygon.setMap(map);
    }
}

function jsonMap() {
    if (tipoForma == 0) {
        console.log(objectMarker);
        return {
            tipoForma: tipoForma,
            objectData: objectMarker
        };
    }

    return {
        tipoForma: tipoForma,
        objectData: objectPolygon
    };
}