var polygon2 = null;
var tipoForma2 = null;
var georssLayer2 = null;
var polilinea2 = null;

var marker2 = null;
var map2 = null;

var objectMarker2 = null;
var objectPolygon2 = null;
var objectPoliline2 = null;

function initMap2( ) {
    tipoForma2 = 0;

    map2 = new google.maps.Map(document.getElementById( 'map2' ), {
        zoom: 10,
        center: { lat: -12.079116, lng: -77.042365 },
        mapTypeId: 'hybrid',
        disableDefaultUI: true
    });

    // Construct the polygon2.
    generatePolygon2();

    generatePolilinea2();

    map2.addListener('click', addLatLng2);
}

function addLatLng2(event) {

    if (tipoForma2 == 0) {

        if (marker2 !== null) {
            marker2.setMap(null);
        }

        objectMarker2 = { position: event.latLng };
        marker2 = new google.maps.Marker(objectMarker2);
        marker2.setMap(map2);

        return;
    }

    if (tipoForma2 == 1) {
        polygon2.setMap(map2);
        var path = polygon2.getPath();
        if (typeof path == 'undefined') {
            path = [];
            path.push(event.latLng);
            polygon2.setPath(path);
        }
        path.push(event.latLng);
    }

        polilinea2.setMap(map2);
        var path = polilinea2.getPath();
        if (typeof path == 'undefined') {
            path = [];
            path.push(event.latLng);
            polygon2.setPath(path);
        }
        path.push(event.latLng);

}

function setFormType2(forma) {

    if (tipoForma2 !== forma) {
        tipoForma2 = forma;
        cleanMapa2();
    }

}

function cleanMapa2() {
    if (marker2 != null) {
        marker2.setMap(null);
        marker2 = null;
    }

    if (polygon2 !== null) {
        polygon2.setMap(null);
        polygon2 = null;
    }

    if (polilinea2 !== null) {
        polilinea2.setMap(null);
        polilinea2 = null;
    }

    if (georssLayer2 != null) {
        georssLayer2.setMap(null);
        georssLayer2 = null;
    }
    generatePolygon2();
    generatePolilinea2();
}

function generatePolygon2() {
    var triangleCoords = [];

    objectPolygon2 = {
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        editable: true,
        fillOpacity: 0.35
    };

    polygon2 = new google.maps.Polygon(objectPolygon2);
}

function generatePolilinea2() {
    var triangleCoords = [];

    objectPoliline2 = {
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        editable: true,
        fillOpacity: 0.35
    };

    polilinea2 = new google.maps.Polyline(objectPoliline2);
}



function loadMapByURL2(url) {
    cleanMap2a();
    georssLayer2 = new google.maps.KmlLayer({ url: url });
    georssLayer2.setMap2(map2);
}

function loadMap2(data) {

    var jsonData = JSON.parse(data);

    if (jsonData.tipo == 0) {
        loadMap2aByData(jsonData.valor);
        return;
    }

    loadMapByURL2(jsonData.valor)
}

function loadMapaByData2(data) {

    // Marker2
    if (data.tipoForma2 == 0) {
        objectMarker2 = data.objectData;
        marker2 = new google.maps.Marker(objectMarker2);
        marker2.setMap2(map2);
    }

    // Poligono
    if (data.tipoForma2 == 1) {
        objectPolygon2 = data.objectData;
        polygon2 = new google.maps.Polygon(objectPolygon2);
        polygon2.setMap2(map2);
    }
}

function jsonMap2() {
    if (tipoForma2 == 0) {
        console.log(objectMarker2);
        return {
            tipoForma2: tipoForma2,
            objectData: objectMarker2
        };
    }

    return {
        tipoForma2: tipoForma2,
        objectData: objectPolygon2
    };
}