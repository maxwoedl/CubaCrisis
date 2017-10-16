var DEBUG = true;

// ---------- Coordinates -----------------------------------------------
var offset = {long: 20, lat: 0};
var center = {zoom: 1, long: 10, lat: 44.5};

var havanna = {zoom: 7, long: -82, lat: 23, label: "Havanna"};
var washington = {zoom: 6, long: -77, lat: 39, label: "Washington DC"};
var moscow = {zoom: 5, long: 38, lat: 56, label: "Moskau"};

var destinations = [havanna, washington, moscow];

// ---------- Generating Map -----------------------------------------------

    var map = AmCharts.makeChart("mapdiv", {
      "type": "map",
      "theme": "light",
      "zoomDuration": "0.25",
      "zoomOnDoubleClick": false,
      "dragMap": false,
      "dataProvider": {
        "map": "worldLow",
        "getAreasFromMap": false,
        "areas": [ {id: "US", color: "#F08080"}, {id: "RU", color: "#ADD8E6"}, {id: "CU", color: "#FF4500"}],   // Colors of used countries
      },
      "zoomControl": {
          "zoomControlEnabled": false,
          "homeButtonEnabled": false
      },
      "areasSettings": {
        "autoZoom": false,
        "unlistedAreasColor": "#b5b9bf",    // Color of unused countries
        "rollOverColor": "#0000FF"          // Color when hovering country
      },
      "listeners": [{
        "event": "rendered",
        "method": function(e) {
          var map = e.chart;
          map.initialZoomLevel = map.zoomLevel();
          map.initialZoomLatitude = map.zoomLatitude();
          map.initialZoomLongitude = map.zoomLongitude();
        }
      }]
    });


function zoomIn() {
  map.zoomIn();
}

function zoomOut() {
  map.zoomOut();
}

function zoomToDestination(dest) {
    map.zoomToLongLat(center.zoom, center.long + offset.long, center.lat);

    setTimeout(function() {
      map.zoomToLongLat(dest.zoom, dest.long + offset.long, dest.lat);
    }, 1500);
}

// ---------- Labels -----------------------------------------------

// var icon = "M-281,412.9c-3.3,0-6,2.7-6,6c0,3.9,4.3,8.7,5,9.4c0.3,0.3,0.5,0.6,1,0.6s0.7-0.3,1-0.6c0.7-0.7,5-5.5,5-9.4C-275,415.6-277.7,412.9-281,412.9z M-281,422.9c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4C-277,421.1-278.8,422.9-281,422.9z M-281,416.9c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2s2-0.9,2-2C-279,417.8-279.9,416.9-281,416.9z"

setTimeout(function () {
    map.dataProvider.images = [];

    for(var i = 0; i < destinations.length; i++) {
        let pin = new AmCharts.MapImage();
				pin.imageURL = "images/pin_marker.svg";
        pin.width = 30;
        pin.height = 60;
        pin.labelShiftY = -10;
        pin.labelShiftX = -5;
        pin.labelFontSize = 14;
				pin.longitude = destinations[i].long;
        pin.latitude = destinations[i].lat;
        pin.labelRollOverColor = "#000000";     // Color when hovering the label of destination
        // pin.svgPath = icon;
				// pin.color = "#ff0000";
				// pin.scale = 2;
        pin.label = destinations[i].label;
        pin.labelPosition = "right";
        map.dataProvider.images.push(pin);
    }

    map.validateData();

    zoomToDestination(center);

}, 500);



// ---------- Debugging (activate debug var to enable) -----------------------------------------------
window.addEventListener("keydown", function(event) {
    if(DEBUG) {
        switch(event.keyCode) {
            case 67: zoomToDestination(cuba); break;
            case 82: zoomToDestination(russia); break;
            case 27: zoomToDestination(center); break;
            case 87: zoomToDestination(washington); break;
            case 72: zoomToDestination(havanna); break;
            case 77: zoomToDestination(moscow); break;
        }
    }
});
