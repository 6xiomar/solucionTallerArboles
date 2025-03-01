var map = L.map('map').setView([4.567622358007924, -74.0694004251705], 18.1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


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

async function loadTrees(){

    let myData2 = await fetch('arbolesGranColombia.geojson'); // al hacer esto él trae el archivo como Texto
    let myTrees = await myData2.json(); // así qye se convierte a json
    L.geoJSON(
                myTrees, 
                {
                    style:{
                        color: 'green'
                    }
                }
            ).addTo(map) // se carga con función de leaflet
}


buttonTrees.addEventListener('click', ()=>loadTrees());