var DEBUG = true;
var atCenter = false;

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
        "areas": [ {id: "US", color: "#B0E1B1"}, {id: "RU", color: "#B0E1B1"}, {id: "CU", color: "#B0E1B1"}],   // Colors of used countries
      },
      "zoomControl": {
          "zoomControlEnabled": false,
          "homeButtonEnabled": false
      },
      "areasSettings": {
        "autoZoom": false,
        "unlistedAreasColor": "#D0E1B1",            // Color of unused countries
        "rollOverColor": "#A0D1B1",                 // Color when hovering country
        "outlineColor": "#7D807C",                  // Color of used country outline
        "unlistedAreasOutlineColor": "#7D807C",    // Color of unused country outline
        "alpha": 1,
        "unlistedAreasAlpha": 1
      },
      "listeners": [
      {
        "event": "clickMapObject",
        "method": function( event ) {
          alert(event);
        }
      }
    ]
    });


function zoomIn() {
  map.zoomIn();
}

function zoomOut() {
  map.zoomOut();
}

function zoomToDestination(dest) {
    if(!atCenter) {
        map.zoomToLongLat(center.zoom, center.long + offset.long, center.lat + offset.lat);

        setTimeout(function() {
            map.zoomToLongLat(dest.zoom, dest.long + offset.long, dest.lat + offset.lat);
        }, 1500);
    }
    else {
        map.zoomToLongLat(dest.zoom, dest.long + offset.long, dest.lat + offset.lat);
    }

    atCenter = (dest == center) ? true : false;
}

// ---------- Labels -----------------------------------------------

window.addEventListener("load", function(){

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
        pin.labelRollOverColor = "#B72323";     // Color when hovering the label of destination
        pin.label = destinations[i].label;
        pin.labelPosition = "right";
        map.dataProvider.images.push(pin);
    }

    /*
    map.dataProvider.images.push( {
    "type": "circle",
    "theme": "light",
    "width": 200,
    "height": 200,
    "color": '#FF0000',
    "alpha": 0.4,
    "longitude": havanna.long,
    "latitude": havanna.lat,
  } );


  map.addListener("click", function(){
      zoomToDestination(center);
  });

  */
    map.validateData();

    zoomToDestination(center);

    var labels = document.getElementsByTagName('tspan');
    for(i = 0; i < labels.length; i++)
    	labels[i].onclick = labelClicked;

    function labelClicked() {

      switch(this.innerHTML) {
        case "Havanna": console.log(this.innerHTML); break;
        case "Washington DC": console.log(this.innerHTML); break;
        case "Moskau": console.log(this.innerHTML); break;
      }
    }

});


// ---------- Debugging (activate debug var to enable) -----------------------------------------------
window.addEventListener("keydown", function(event) {
    if(event.keyCode == 112) {
        DEBUG = (DEBUG) ? false : true;
        console.log("Debugging:" + DEBUG);
    }

    if(DEBUG) {
        switch(event.keyCode) {
            case 27: zoomToDestination(center); break;
            case 87: zoomToDestination(washington); break;
            case 72: zoomToDestination(havanna); break;
            case 77: zoomToDestination(moscow); break;
        }
    }
});
