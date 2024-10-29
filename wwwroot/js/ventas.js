function ObtenerInscripciones() {
    fetch('https://localhost:7245/Ventas')
    .then(result => result.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarVetass(data) {
    $("#todasLasVentas").empty();
    
