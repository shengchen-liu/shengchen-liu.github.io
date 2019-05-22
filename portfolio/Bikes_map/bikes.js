var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGF3c29uMTIyNSIsImEiOiJjanRmaDcwNmowNnJjNDlwZzgxanNuMjJoIn0.vh3KmGp9AYnNRSJkoTWQNg';

// Now let’s create those base layers and add the default ones to the map:
var satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
    streets   = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr});

// jump_bikes layer
var jump_bikes = L.layerGroup();
var lime_bikes = L.layerGroup();
var spin_bikes = L.layerGroup();

// var mymap = L.map('map_1').setView([34.0537767, -118.2428987], 15);

var mymap = L.map('map_1', {
	center: [34.0537767, -118.2428987],
	zoom: 15,
	layers: [streets, jump_bikes, lime_bikes, spin_bikes]
});

var baseLayers = {
		"Satellite": satellite,
		"Streets": streets
	};

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

var jumpIcon = new L.Icon({
                    iconSize: [27, 27],
                    iconAnchor: [13, 27],
                    popupAnchor:  [1, -24],
                    iconUrl: 'icon/Jump.png'
            });

// JumpBike
$.getJSON("data/atx_jumpbikes_free_bike_status_1558454068.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
    var geoJsonLayer = L.geoJson(data ,{
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: jumpIcon});
            },
        onEachFeature: function(feature, featureLayer) {
            featureLayer.bindPopup('Company:' + feature.company + '<br>' +
                                    'Bike_id:' + feature.properties.bike_id + '<br>' + 
                                    'Name:' + feature.properties.name + '<br>' +
                                    'is_reserved:' + feature.properties.is_reserved + '<br>' + 
                                    'is_disabled:' + feature.properties.is_disabled + '<br>' +
                                    'jump_ebike_battery_level: ' + feature.properties.jump_ebike_battery_level + '<br>' +
                                    'jump_vehicle_type: ' + feature.properties.jump_vehicle_type + '<br>');
        }
    });


    //  cluster
    var markers = new L.MarkerClusterGroup();
    var markersList = [];
    markers.addLayer(geoJsonLayer);
    jump_bikes.addLayer(markers);
    mymap.addLayer(markers);
    mymap.fitBounds(geoJsonLayer.getBounds());
});

// Lime
// http://bl.ocks.org/ThomasG77/61fa02b35abf4b971390
var limeIcon = new L.Icon({
                    iconSize: [27, 27],
                    iconAnchor: [13, 27],
                    popupAnchor:  [1, -24],
                    iconUrl: 'icon/Lime.png'
            });

$.getJSON("data/washington_dc_Lime_free_bike_status_1558463148.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
    var geoJsonLayer = L.geoJson(data ,{
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: limeIcon});
            },
        onEachFeature: function(feature, featureLayer) {
            featureLayer.bindPopup(
                                    'Last Updated: '+ new Date(parseInt(feature.last_updated, 10) * 1000) + '<br>' +
                                    'Company:' + feature.company + '<br>' +
                                    'Bike_id:' + feature.properties.bike_id + '<br>' + 
                                    'is_reserved:' + feature.properties.is_reserved + '<br>' + 
                                    'is_disabled:' + feature.properties.is_disabled + '<br>' +
                                    'vehicle_type: ' + feature.properties.vehicle_type + '<br>');

        }
    });

    //  cluster
    var markers = new L.MarkerClusterGroup();
    var markersList = [];
    markers.addLayer(geoJsonLayer);
    lime_bikes.addLayer(markers);
    mymap.addLayer(markers);
    mymap.fitBounds(geoJsonLayer.getBounds());
});


// Spin
var spinIcon = new L.Icon({
                    iconSize: [27, 27],
                    iconAnchor: [13, 27],
                    popupAnchor:  [1, -24],
                    iconUrl: 'icon/Spin.jpg'
            });

$.getJSON("data/washington_dc_Spin_free_bike_status_1558484669.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
    var geoJsonLayer = L.geoJson(data ,{
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: spinIcon});
            },

        onEachFeature: function(feature, featureLayer) {
            featureLayer.bindPopup(
                                    'Last Updated: '+ new Date(parseInt(feature.last_updated, 10) * 1000) + '<br>' +
                                    'Company:' + feature.company + '<br>' +
                                    'Bike_id:' + feature.properties.bike_id + '<br>' + 
                                    'is_reserved:' + feature.properties.is_reserved + '<br>' + 
                                    'is_disabled:' + feature.properties.is_disabled + '<br>' +
                                    'vehicle_type: ' + feature.properties.vehicle_type + '<br>');

        }
    });

    //  cluster
    var markers = new L.MarkerClusterGroup();
    var markersList = [];
    markers.addLayer(geoJsonLayer);
    spin_bikes.addLayer(markers);
    mymap.addLayer(markers);
    mymap.fitBounds(geoJsonLayer.getBounds());
});




var overlays = {
	"Jump Bike": jump_bikes,
    "Lime Bike": lime_bikes,
    "Spin Bike": spin_bikes
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
