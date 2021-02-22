// Creating map object
var myMap = L.map("map", {
    center: [47.1164, -102.2437],
    zoom: 4
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// URL for Earthquake Data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" ;

// Earthquake layer
var earthquake = new L.LayerGroup();

// Set marker size by magnitude
function markerSize(magnitude) {
    return magnitude * 4;
};

// Create markers
function circleMarkers(feature, latlng ){

    // Change the values of the markers
    var markerOptions = {
      radius: markerSize(feature.properties.mag),
      fillColor: colors(feature.properties.mag),
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
    return L.circleMarker( latlng, markerOptions );
    };

// Grab the data with d3
d3.json(url, function(response) {

    L.geoJson(response.features, {
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: colors(geoJsonFeature.properties.mag),
                fillOpacity: 0.7,
                weight: 0.1,
                color: 'black'

            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(myMap);
});

//Colour function based on magnitude
function colors(magnitude) {
    if (magnitude > 5) {
        return '#FF8C00'
    } else if (magnitude > 4) {
        return 'red'
    } else if (magnitude > 3) {
        return 'darkorange'
    } else if (magnitude > 2) {
        return 'yellow'
    } else if (magnitude > 1) {
        return 'lightyellow'
    } else {
        return 'green'
    }
};

  // Create legend
  var info = L.control({
    position: 'bottomright'
  });

  // Insert 'legend' div 
  info.onAdd = function(){
    labels = ['0-1', '1-2', '2-3', '3-4', '4-5', '5+']
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h3>Magnitude</h3>'
    for (var i = 0; i <= 5; i++) {
      div.innerHTML += '<p><span style="font-size:20px; background-color:' + colors(i) +
        ';">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + labels[i] + '</p>';
    }
    
    return div;
  };

  // Add legend to map
  info.addTo(myMap);

