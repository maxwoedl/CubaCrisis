var DEBUG = true;

// ---------- City Coordinates -----------------------------------------------
var cuba = {zoom: 7, long: -90, lat: 30};
var russia = {zoom: 5, long: 100, lat: 50};
var center = {zoom: 1, long: 10, lat: 44.5};


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

function zoomToCity(city) {
    map.zoomToLongLat(center.zoom, center.long, center.lat);

    setTimeout(function() {
    map.zoomToLongLat(city.zoom, city.long, city.lat);
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
}, 1000);



// ---------- Debugging (activate debug var to enable) -----------------------------------------------
window.addEventListener("keydown", function(event) {
    if(DEBUG) {
        switch(event.keyCode) {
            case 67: zoomToCity(cuba); break;
            case 82: zoomToCity(russia); break;
            case 27: zoomToCity(center); break;
        }
    }
});
