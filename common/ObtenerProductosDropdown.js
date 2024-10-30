function ObtenerProductosDropdown() {
    fetch('https://localhost:7245/Productos')
    .then(response => response.json())
    .then(async data => {
        // CompletarDropdownProductos(data);
        localStorage.setItem("productos", JSON.stringify(data));
    })
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}




function FiltrarDropdownProductos(productos, todosLosProductos) {
    todosLosProductos = JSON.parse(todasLosProductos);

    if (productos != null) {
        $('#productosId').empty();

        const productosFiltrados = todosLosProductos.filter(todosLosProductosItem => 
            !productos.find(productosItem => productosItem.productosId ===  todosLosProductosItem.id)
        );

        console.log("Productos filtrados: ", productosFiltrados);

        $.each(productosFiltrados, function(index, item) {
            $('#ProductosId').append(
                "<option value='"+ item.id + "'>" + item.nombreProducto + "</option>"            
            )
        })
    }
    else {
        $.each(todosLosProductos, function(index, item) {
            $('#ProductosId').append(
                "<option value='"+ item.id + "'>" + item.nombreProducto + "</option>"            
            )
        })
    }
}