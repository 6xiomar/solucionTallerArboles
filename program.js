//Elemento 1
// mapa centrado en mi barrio con uso de coordenadas

var map = L.map('map').setView([4.567622358007924, -74.0694004251705], 18.1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Elemento 2:
// polígono de mi barrio

async function loadPolygon(){

    let myData = await fetch('barrioGranColombia.geojson'); // al hacer esto él trae el archivo como Texto
    let myPolygon = await myData.json(); // así qye se convierte a json
    L.geoJSON(
                myPolygon, 
                {
                    style:{
                        color: 'purple'
                    }
                }
            ).addTo(map) // se carga con función de leaflet
}

loadPolygon() // se llama la función que acabamos de crear


// Elemento 3: Árboles

// manejador para los árboles
let buttonTrees = document.getElementById('buttonTrees');

// Función para cargar árboles
async function loadTrees(){

    let myData2 = await fetch('arbolesGranColombia.geojson'); // al hacer esto él trae el archivo como Texto
    let myTrees = await myData2.json(); // así qye se convierte a json
    L.geoJSON(myTrees, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 6, // Tamaño del punto
                fillColor: "green", // Color del relleno
                color: "darkgreen", // Color del borde
                weight: 1, // Grosor del borde
                opacity: 1, // Opacidad del borde
                fillOpacity: 0.8 // Opacidad del relleno
            }).bindPopup(`Árbol: ${feature.properties.nombre || "Desconocido"}`); // Popup opcional
        }
    }
            ).addTo(map) // se carga con función de leaflet
}

// Respuesta al click
buttonTrees.addEventListener('click', ()=>loadTrees());