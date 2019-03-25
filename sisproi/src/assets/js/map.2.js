var polygon2 = null;
var tipoForma2 = null;
var georssLayer2 = null;
var polilinea2 = null;

var marker2 = null;
var map2 = null;

var objectMarker2 = null;
var objectPolygon2 = null;
var objectPoliline2 = null;

function initMap2() {
    tipoForma2 = 0;

    map2 = new google.maps.Map(document.getElementById('map2'), {
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
        if ((typeof path == 'undefined') || (path.length == 0)) {
            path = [];
            objectPolygon2 = [];
            path.push(event.latLng);
            polygon2.setPath(path);
        }
        path.push(event.latLng);
        objectPolygon2.push(event.latLng);
        return;
    }

    polilinea2.setMap(map2);
    var path = polilinea2.getPath();
    if ((typeof path == 'undefined') || (path.length == 0)) {
        path = [];
        objectPoliline2 = [];
        path.push(event.latLng);
        polilinea2.setPath(path);
    }
    path.push(event.latLng);
    objectPoliline2.push(event.latLng);

}

function setFormType2(forma) {

    if (tipoForma2 !== forma) {
        cleanMapa2();
        tipoForma2 = forma;
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

    cleanOptions2();
}

function generatePolygon2() {
    var triangleCoords = [];

    objectPg2 = {
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        editable: true,
        fillOpacity: 0.35
    };

    polygon2 = new google.maps.Polygon(objectPg2);
}

function generatePolilinea2() {
    var triangleCoords = [];

    objectPol2 = {
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        editable: true,
        fillOpacity: 0.35
    };

    polilinea2 = new google.maps.Polyline(objectPol2);
}

function cleanOptions2() {
    $('#radio_a1').attr('checked', false);
    $('#radio_a2').attr('checked', false);
    $('#radio_a3').attr('checked', false);
    tipoForma2 = null;
}

function loadMapByURL2(url) {
    cleanMapa2();
    georssLayer2 = new google.maps.KmlLayer({ url: url });
    georssLayer2.setMap(map2);
}

function loadMap2(data) {

    var jsonData = JSON.parse(data);

    if (jsonData.tipo == 0) {
        loadMapaByData2(jsonData.valor);
        return;
    }

    loadMapByURL2(jsonData.valor)
}

function loadMapaByData2(data) {
    try {
        tipoForma2 = data.tipoForma;
        // Marker2
        if (data.tipoForma == 0) {
            objectMarker2 = data.objectData;
            marker2 = new google.maps.Marker(objectMarker2);
            marker2.setMap(map2);
            $("#radio_a1").attr("checked", true);
        }

        // Poligono
        if (data.tipoForma == 1) {
            generatePolygon2();
            objectPolygon2 = data.objectData;
            polygon2.setPath(objectPolygon2);
            polygon2.setMap(map2);
            $("#radio_a2").attr("checked", true);
        }

        // Polilinea
        if (data.tipoForma == 2) {
            generatePolilinea2();
            objectPoliline2 = data.objectData;
            polilinea2.setPath(objectPoliline2);
            polilinea2.setMap(map2);
            $("#radio_a3").attr("checked", true);
        }
    } catch (e) {
        console.error('No se carga mapa: ' + e.message);
    }


}

function jsonMap2() {
    if (tipoForma2 == 0) {
        return {
            tipoForma: tipoForma2,
            objectData: objectMarker2
        };
    }

    if (tipoForma2 == 1) {
        return {
            tipoForma: tipoForma2,
            objectData: objectPolygon2
        }
    }

    if (tipoForma2 == 2) {
        return {
            tipoForma: tipoForma2,
            objectData: objectPoliline2
        }
    }

    return null;
}