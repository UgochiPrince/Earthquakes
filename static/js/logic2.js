/*
// Define the map object and pass the default
let myMap = L.map("map", {
    center: [37.0902, -75.7129],
    zoom: 3,
    //layers: [streetmap, tectonicLines]
});

// Add a Satellite layer 
let googleSatmap = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(myMap);

 // Add a StreetMap tile layer.
 let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
 // Add a TopoMap tile layer.
  let topographicmap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }).addTo(myMap);

// Create a baseMaps object 
let baseMaps = {
    "Satellite": googleSatmap,
    "Street Map": streetmap,
    "Topograhic":topographicmap

};
*/
// Create separate layer group for the tectonic plate
let tectonicLines = new L.LayerGroup();
/*
// Create an overlay object 
let overlayMaps = {
    "Tectonic plates": tectonicLines,
    
};


// Pass the map layers into the layer control
L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(myMap);

*/
// Store the tectonic and earthquake API in URLs
let tectonicData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Perform a GET request to the tectonic URL
d3.json(tectonicData).then(function(data) {

    //Get the features data that contains necessary info
    let feature = data.features;

    // Loop through the features array and obtain the coordinates for the fault lines 
    for (let i = 0; i < feature.length; i++) {

        //Save the coordinates in a new variable 
        let coords = feature[i].geometry.coordinates;
        //console.log(coords);

        //Coordinates are not in correct format, they need to be flipped
        //Create new array to store the flipped coords
        let newCoords = [];

        // Push the changes to new array 
        newCoords.push(coords.map(c => [c[1], c[0]]));
        //console.log(newCoords);

        //Create the polyline using the new coords 
        L.polyline(newCoords, {
        color: "blue"
     }).addTo(tectonicLines);
    }
});
