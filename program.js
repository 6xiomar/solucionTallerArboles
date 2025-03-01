var map = L.map('map').setView([4.567622358007924, -74.0694004251705], 18.1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


async function loadPolygon(){

    let myData = await fetch('barrioGranColombia.geojson'); // al hacer esto él trae el archivo como Texto
    let myPolygon = await myData.json(); // así qye se convierte a json
    L.geoJSON(myPolygon, 
        {
            style:{
                color: 'purple'
            }
        }
        ).addTo(map) // se carga con función de leaflet
}

loadPolygon()