var DEBUG = true;

// ---------- Coordinates -----------------------------------------------
var offset = {long: 20, lat: 0};
var cuba = {zoom: 7, long: -60, lat: 22};
var center = {zoom: 1, long: 10, lat: 44.5};

var havanna = {zoom: 7, long: -82, lat: 23};
var washington = {zoom: 5, long: -77, lat: 39};
var moscow = {zoom: 5, long: 38, lat: 56};


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
        "areas": [ {id: "US", color: "#F08080"}, {id: "RU", color: "#ADD8E6"}, {id: "CU", color: "#FF4500"}],
      },
      "zoomControl": {
          "zoomControlEnabled": false,
          "homeButtonEnabled": false
      },
      "areasSettings": {
        "autoZoom": false,
        "unlistedAreasColor": "#b5b9bf"
      },
      "imagesSettings": {
        "labelPosition": "middle",
        "labelFontSize": 11
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
    map.zoomToLongLat(center.zoom, center.long, center.lat);

    setTimeout(function() {
    map.zoomToLongLat(dest.zoom, dest.long + offset.long, dest.lat);
    }, 1500);
}

// ---------- Labels -----------------------------------------------
setTimeout(function () {
    map.dataProvider.images = [];
    for(var i = 0; i < 3; i++) {
      var area = map.dataProvider.areas[i];
      area.groupId = area.id;
      var image = new AmCharts.MapImage();
      image.latitude = map.getAreaCenterLatitude( area );
      image.longitude = map.getAreaCenterLongitude( area );
      image.label = area.title;
      image.title = area.title;
      map.dataProvider.images.push( image );
    }
    map.validateData();
    console.log(map.dataProvider);
}, 800);



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
