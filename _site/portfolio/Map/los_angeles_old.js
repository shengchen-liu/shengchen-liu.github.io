var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGF3c29uMTIyNSIsImEiOiJjanRmaDcwNmowNnJjNDlwZzgxanNuMjJoIn0.vh3KmGp9AYnNRSJkoTWQNg';

// Now let’s create those base layers and add the default ones to the map:
var satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
    streets   = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr});

// houses layer
var houses = L.layerGroup();

// var mymap = L.map('map_1').setView([34.0537767, -118.2428987], 15);

var mymap = L.map('map_1', {
	center: [34.0537767, -118.2428987],
	zoom: 15,
	layers: [streets, houses]
});

var baseLayers = {
		"Satellite": satellite,
		"Streets": streets
	};

//  cluster
var markers = new L.MarkerClusterGroup();
var markersList = [];

// read data from csv
url = './data/visualization.csv'

function read_from_csv(url){
 ///this one way of declaring array in javascript
	d3.csv(url, function(csvdata) {
		geo_data = csvdata.map(function (d) {
	            return {
	                parcelid: d.parcelid,
	                latitude: +d.lat,
	                longitude: +d.lng}
	            })


	// console.log(geo_data)
		load_points(geo_data, houses, 100)
	})
	// console.log(window.geo_data)
}

function load_points(data, layer, limit){
    L.marker([34.0537767, -118.2428987]).bindPopup('<b>Los Angeles City Hall!</b><br>I am a popup.').addTo(layer);
    total_points = data.length
    // console.log(total_points)

    for(var i = 0; i<total_points;i++){
        if (i > limit){
            break;
        }
        latitude = data[i].latitude;
        longitude = data[i].longitude;
        // L.marker([latitude, longitude]).addTo(layer)
        var m = new L.Marker([latitude, longitude]);
        markersList.push(m);
        markers.addLayer(m);

        // console.log(i)
        }

}

// Dealing with events
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}


// Here we specify 16 as the maximum zoom when setting the map view automatically. As soon as the user agrees to share its location and it’s detected by the browser, the map will set the view to it. Now we have a working fullscreen mobile map! But what if we need to do something after the geolocation completed? Here’s what the locationfound and locationerror events are for. Let’s for example add a marker in the detected location, showing accuracy in a popup, by adding an event listener to locationfound event before the locateAndSetView call:
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(mymap);
}

function onLocationError(e) {
    alert(e.message);
}

$.getJSON("data/visualization.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
    var geoJsonLayer = L.geoJson(data ,{
        onEachFeature: function(feature, featureLayer) {
            featureLayer.bindPopup('Address:' + feature.properties.address + '<br>' + 
                                    'Price: $' + feature.properties.taxvaluedollarcnt + '<br>' +
                                    'Predicted Price: $' + feature.properties.pred_tax_value + '<br>' + 
                                    'Aircondition: ' + feature.properties.airconditioningtypeid + '<br>' +
                                    'Bathroom: ' + feature.properties.bathroomcnt + '<br>' +
                                    'Bedroom: ' + feature.properties.bedroomcnt + '<br>');
        }
    });
    markers.addLayer(geoJsonLayer);
    mymap.addLayer(markers);
    mymap.fitBounds(geoJsonLayer.getBounds());
});


// markers.on('click', function (a) {
//     alert('marker ' + a.layer);
// });
// read_from_csv(url)
// mymap.addLayer(markers);
// // console.log(geo_data)






var overlays = {
	"Houses": houses
};

L.control.layers(baseLayers, overlays).addTo(mymap);



// layers
// var popup = L.popup()
//     .setLatLng([34.044793,  -118.246846])
//     .setContent("I am a standalone popup.")
//     .openOn(mymap);


// mymap.on('click', onMapClick);



mymap.on('locationfound', onLocationFound)
	.on('locationerror', onLocationError);
// Leaflet has a very handy shortcut for zooming the map view to the detected location — locate method with the setView option, replacing the usual setView method in the code
mymap.locate({setView: true, maxZoom: 15});
