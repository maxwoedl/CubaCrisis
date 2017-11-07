let DEBUG = true
let atCenter = false
let rocketsVisible = false

// ---------- Coordinates -----------------------------------------------
let offset = {long: 20, lat: 0}

let center = {zoom: 1, long: 10, lat: 44.5}
let havanna = {zoom: 7, long: -82, lat: 23, label: "Havanna"}
let washington = {zoom: 6, long: -77, lat: 39, label: "Washington DC"}
let moscow = {zoom: 5, long: 38, lat: 56, label: "Moskau"}

let labeledCities = [havanna, washington, moscow]
let missiles = [{origin: {long: -83, lat: 23}, range: 23, color: '#FF0000'}]

// ---------- Generating Map -----------------------------------------------

    let map = AmCharts.makeChart("mapdiv", {
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

        }
      }
    ]
    })


function zoomIn() {
    map.zoomIn()
}

function zoomOut() {
    map.zoomOut()
}

function zoomToDestination(dest, instant) {
    if(!atCenter) {
        map.zoomToLongLat(center.zoom, center.long + offset.long, center.lat + offset.lat, instant)

        setTimeout(function() {
            map.zoomToLongLat(dest.zoom, dest.long + offset.long, dest.lat + offset.lat, instant)
        }, 1500)
    }
    else {
        map.zoomToLongLat(dest.zoom, dest.long + offset.long, dest.lat + offset.lat, instant)
    }

    atCenter = (dest == center) ? true : false
}


// ---------- Circles for Rocket Ranges -----------------------------------------------
function showRocketRange() {
    if(!rocketsVisible) {
        for(let i = 0; i < missiles.length; i++) {
            map.dataProvider.images.push({
              "type": "circle",
              "theme": "light",
              // "width": missiles[i].range,
              // "height": missiles[i].range,
              "percentWidth": missiles[i].range,
              "percentHeight": missiles[i].range,
              "color": missiles[i].color,
              "alpha": 0.4,
              "longitude": missiles[i].origin.long,
              "latitude": missiles[i].origin.lat,
              "fixedSize": "true",
            })
        }
    }
    else
      map.dataProvider.images.splice(map.dataProvider.images.length - missiles.length)

    rocketsVisible = (rocketsVisible) ? false : true

    map.validateData()

    zoomToDestination(center, true)

}

// ---------- Labels -----------------------------------------------
window.addEventListener("load", function(){

    map.dataProvider.images = []

    for(let i = 0; i < labeledCities.length; i++) {
        let pin = new AmCharts.MapImage()
				pin.imageURL = "images/pin_marker.svg"
        pin.width = 30
        pin.height = 60
        pin.labelShiftY = -10
        pin.labelShiftX = -5
        pin.labelFontSize = 14
				pin.longitude = labeledCities[i].long
        pin.latitude = labeledCities[i].lat
        pin.labelRollOverColor = "#B72323"     // Color when hovering the label of destination
        pin.label = labeledCities[i].label
        pin.labelPosition = "right"
        map.dataProvider.images.push(pin)
    }

    /*

  map.addListener("click", function(){
      zoomToDestination(center, false)
  })

  */

    map.validateData()

    zoomToDestination(center, false)

    let labels = document.getElementsByTagName('tspan')
    for(i = 0; i < labels.length; i++)
    	labels[i].onclick = labelClicked

    function labelClicked() {

      switch(this.innerHTML) {
        case "Havanna": console.log(this.innerHTML); break;
        case "Washington DC": console.log(this.innerHTML); break;
        case "Moskau": console.log(this.innerHTML); break;
      }
    }

})


// ---------- Debugging (activate debug let to enable) -----------------------------------------------
window.addEventListener("keydown", function(event) {
    if(event.keyCode == 112) {
        DEBUG = (DEBUG) ? false : true
        console.log("Debugging:" + DEBUG)
    }

    if(DEBUG) {
        switch(event.keyCode) {
            case 27: zoomToDestination(center, false); break;
            case 87: zoomToDestination(washington, false); break;
            case 72: zoomToDestination(havanna, false); break;
            case 77: zoomToDestination(moscow, false); break;
            case 82: showRocketRange(); break;
        }
    }
})
