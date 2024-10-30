function ObtenerVentas() {
    fetch('https://localhost:7245/Ventas')
    .then(result => result.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarVentas(data) {
    $("#todasLasVentas").empty();
    
    $.each(data, function(index, item) {
        var date = new Date(item.fechaVenta);
        
        $('#todasLasVentas').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + date.toLocaleString() + "</td>",
            "<td>" + item.finalizada + "</td>",
            "<td>" + item.fechaVenta + "</td>",
            "<td>"  + "</td>",
            "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
            "<td><button class='btn btn-success' onclick='BuscarVentasCargadas(" + item.id + ")'>Ventas cargadas</button></td>",
            "</tr>"
        )
    })
}

function CrearVenta() {
    let Ventas = {
        fechaVenta: document.getElementById("FechaVenta").value,
        finalizada: document.getElementById("Finalizada").checked,
        clienteId: document.getElementById("ClienteId").value,
        ventaDetalle: null
    };

    fetch('https://localhost:7245/Ventas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(Ventas)
        }
    )
   
    .then(data =>{
        // if(data.status == undefined){
            document.getElementById("FechaVenta").value = "";
            document.getElementById("Finalizada").value = "";
            document.getElementById("ClienteId").value = 0;
     

            $('#modalAgregarVenta').modal('hide');
            ObtenerVentas();
        
    })
    .catch(error => console.log("Hubo un error al guardar la Venta, verifique el mensaje de error: ", error))
}

function EliminarVenta(id) {
    var siElimina = confirm("¿Esta seguro de borrar esta Venta?.")
    if (siElimina == true) {
        fetch(`https://localhost:7245/VentasDetalles/${id}`,{
            method: "GET"
        })
        .then(response => response.json())
        .then(async data => {
            console.log(data);
            if (data.lenght != 0) {
                alert("No se puede eliminar la venta debido a que tiene alumnos inscriptos.");
            }
            else {
                EliminarSi(id);
            }
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
        
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerVentas();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}

function BuscarVentaId(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdVenta").value = data.id;
        document.getElementById("FechaVentaEditar").value = data.fechaVenta;
          document.getElementById("PrecioVentaEditar").value = data.VentasId;
        document.getElementById("FinalizadaEditar").checked = data.finalizada;
        document.getElementById("IdClienteEditar").value = data.clienteIdId;

        document.getElementById("FechaVentaEditar").setAttribute("disabled", true);
        document.getElementById("IdClienteEditar").setAttribute("disabled", true);
       

        $('#modalEditarVenta').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function EditarVenta() {
    let permiteEditar = true;
    let IdVenta = document.getElementById("IdVenta").value;
    
    let EditarVenta = {
        id: IdVenta,
        fechaExamen: document.getElementById("FechaVentaEditar").value,
        precioVenta: document.getElementById("PrecioVentaEditar").value,
        finalizada: document.getElementById("FinalizadaEditar").checked,
        clienteId:  document.getElementById("IdClienteEditar").value = data.clienteId,
      
        clienteId: document.getElementById("ClienteIdEditar").value,
        cliente: null,
        
    }






    if (fechaVenta > fechaVenta) {
        alert("Para realizar otra venta al mismo cliente, primero se debe finalizar la venta al mismo cliente.");
        $('#modalEditarVenta').modal('hide');
        permiteEditar = false;
    }

    fetch(`https://localhost:7245/VentasDetalles/${idVenta}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        if (data.lenght != 0) {    
            permiteEditar = false;
        }
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));



    if (permiteEditar) {
        fetch(`https://localhost:7245/Ventas/${IdVenta}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editarVenta)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("IdVenta").value = 0;
            document.getElementById("FechaVentaEditar").value = "";
            document.getElementById("PrecioVentaEditar").value = "";
            document.getElementById("FinalizadaEditar").checked = false;
            document.getElementById("ClienteIdEditar").value = 0;
      
            
            $('#modalEditarVenta').modal('hide');
            ObtenerVentas();
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
    }
}


function BuscarClienteProductos(id) {
    fetch(`https://localhost:7245/VentasDetalles/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(async data => {
        if (data != null || data != []) {    
            MostrarVentasDetalle(data);
            await ObtenerVentasDropdown();
            let todasLasVentas = localStorage.getItem('ventas');
            await FiltrarDropdownVentas(data, todasLasVentas);
        }

        document.getElementById("IdVentaParaDetalle").value = id;
        $('#modalVentaDetalle').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function MostrarVentasDetalle(data) {
    $("#todosLosDetalles").empty();
    $.each(data, function(index, item) {

        $('#todosLosDetalles').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + date.toLocaleString() + "</td>",
            "<td>" + item.finalizada + "</td>",
            "<td>" + item.fechaVenta + "</td>",
            "<td><button class='btn btn-info' onclick=''>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick=''>Eliminar</button></td>",
            "</tr>"
        )
    })
}

function GuardarDetalle() {
    let idVentasDetalle = document.getElementById("IdIVentaParaDetalle").value;
    let ventaCliente = document.getElementById("Venta").value;



    let guardarDetalle = {
        fechaVenta: fechaVentaProducto,
        clienteId: document.getElementById("ClienteId").value,
        fechaVenta: null,
    
    }
    console.log(guardarDetalle)

    fetch('https://localhost:7245/VentasDetalles',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(guardarDetalle)
        }
    )
    .then(response => response.json())
    .then(() => {
            document.getElementById("IdVenta").value = 0;
            document.getElementById("FechaVenta").value = 0;

            $("#errorDetalle").empty();
            $("#errorDetalle").attr("hidden", true);

            BuscarClienteProductos(idVentasDetalle);
    })
    .catch(error => console.log("Hubo un error al guardar la Inscripcion, verifique el mensaje de error: ", error))
}

function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function(index, item) {
            $(id).append(
                "<ol>",
                "<li>" + item + "</li>",
                "</ol>"
            )
        })
    }
    else{
        $(id).append(
            "<ol>",
            "<li>" + mensaje + "</li>",
            "</ol>"
        )
    }
    
    $(id).attr("hidden", false);
}
