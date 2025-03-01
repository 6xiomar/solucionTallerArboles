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
let buttonTrees = document.getElementById("buttonTrees");

// Respuesta al click
buttonTrees.addEventListener('click', 
    async ()=>{
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
                    fillOpacity: 0.5 // Opacidad del relleno
                })
            }
        }).addTo(map) // se carga con función de leaflet
    }
);


// Elemento 3: Distancias entre árboles

// manejador para las distancias entre árboles
let buttonDistances = document.getElementById("buttonDistances");

buttonDistances.addEventListener('click', 
    async ()=>{
        let myData2 = await fetch('arbolesGranColombia.geojson');
        let myTrees = await myData2.json();
        let arrayTrees = myTrees.features.map((myElement, index)=>({
            id: index+1,
            coordinates: myElement.geometry.coordinates
        }));
        // Arreglo para guardar distancias del árbol con todos los demás árboles.
        let distances =[];
        arrayTrees.forEach( (treeA)=>{arrayTrees.forEach(
                (treeB)=>{
                    // Calculo de distancias entre el árbolA y los demás.
                    if(treeA.id != treeB.id){
                        let distance = turf.distance(
                            turf.point(treeA.coordinates), 
                            turf.point(treeB.coordinates)
                        );
                        distances.push(
                            [
                                `Árbol ${treeA.id}`,
                                `Árbol ${treeB.id}`,
                                distance.toFixed(3)     //como la genera con un double, se redondea para que no salga con tantos decimales
                            ]
                        )
                    }
                    
                }
            )
        })
        generatePDF(distances, arrayTrees.lenght);
    }
)


function generatePDF(distances, totalTrees){

    let {jsPDF} = window.jspdf;
    let documentPDF = new jsPDF();

    documentPDF.text("Distancia entre los Árboles del Barrio La Gran Colombia",10,10);

    documentPDF.autoTable(
        {
            head: [['Árbol 1', 'Árbol 2', 'Distancia']],
            body: distances
        }
    );
    documentPDF.save("GranColombia.pdf")
}


