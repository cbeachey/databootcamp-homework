// Creating map object
var myMap = L.map("mapid", {
    center: [34.0522, -118.2437],
    zoom: 8
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


var earthquake = new L.LayerGroup();

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
                fillColor: Color(geoJsonFeature.properties.mag),
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
    }).addTo(earthquake);
    createMap(earthquake);
});




function Color(magnitude) {
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