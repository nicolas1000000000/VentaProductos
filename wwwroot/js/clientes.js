function ObtenerClientes() {
    fetch('https://localhost:7245/Clientes')
    .then(response => response.json())
    .then(data => MostrarClientes(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarClientes(data) {
    let tbody = document.getElementById('todosLosClientes');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdId = document.createTextNode(element.id);
        td0.appendChild(tdId);

        let td1 = tr.insertCell(1);
        let tdName = document.createTextNode(element.nombreCliente);
        td1.appendChild(tdName);

        let td2 = tr.insertCell(2);
        let tdApellido = document.createTextNode(element.apellidoCliente);
        td2.appendChild(tdApellido);

        let td3 = tr.insertCell(3);
        let tdDni = document.createTextNode(element.dni);
        td3.appendChild(tdDni);

        let td4 = tr.insertCell(4);
        let tdSaldo = document.createTextNode(element.saldo);
        td4.appendChild(tdSaldo);


        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarClienteId(${element.id})`);
        let td5 = tr.insertCell(5);
        td5.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarCliente(${element.id})`);
        let td6 = tr.insertCell(6);
        td6.appendChild(btnEliminar);
    });
}
// function MostrarProductos(data) {
//     $("#todosLosProductos").empty();
//     $.each(data, function(index, item) {
//         $('#todosLosProductos').append(
//             "<tr>",
//             "<td>" + item.id + "</td>",
//             "<td>" + item.nombreProducto + "</td>",
//             "<td>" + item.cantidad + "</td>",
//             "<td>" + item.precioVenta + "</td>",
//             "<td>" + item.precioCompra + "</td>",
//             "<td><button class='btn btn-info' onclick='BuscarProductoId(" + item.id + ")'>Modificar</button></td>",
//             "<td><button class='btn btn-danger' onclick='EliminarProducto(" + item.id + ")'>Eliminar</button></td>",
//             "</tr>"
//         )
//     })
// }

function CrearCliente() {
    
    var nombreCliente = document.getElementById("Nombre").value;
    if(nombreCliente  == ""  || nombreCliente == null 
     ) {
        return mensajesError('#error', null, "Por favor ingrese un nombre para el cliente.")
    }
var dni = document.getElementById("Dni").value;
    if (dni == "" || dni == null) {
        return mensajesError('#error', null, "Por favor ingrese un DNI para el Cliente.");
    }

    var saldo = document.getElementById("Saldo").value;
    if (saldo == "" || saldo == null) {
        return mensajesError('#error', null, "Por favor ingrese un Saldo para el Cliente.");
    }

    let cliente = {
        nombreCliente: document.getElementById("Nombre").value,
        apellidoCliente: document.getElementById("Apellido").value,
        dni: document.getElementById("Dni").value,
        saldo: document.getElementById("Saldo").value,
    };

    fetch('https://localhost:7245/Clientes',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(cliente)
        }
    )
    .then(response => response.json())
    .then(data =>{
        if(data.status == undefined){
            document.getElementById("Nombre").value = "";
            document.getElementById("Apellido").value = "";
            document.getElementById("Dni").value = 0;
            document.getElementById("Saldo").value = 0;
            $("#error").empty();
            $("#error").attr("hidden", true);

            $('#modalAgregarClientes').modal('hide');
            ObtenerClientes();
        } else {
            mensajesError('#error', data);
        }
            
    })
    .catch(error => console.log("Hubo un error al guardar el Producto nuevo, verifique el mensaje de error: ", error))
}


function EliminarCliente(id) {
    var siElimina = confirm("¿Esta seguro de borrar este cliente?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Clientes/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerClientes();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function BuscarClienteId(id) {
    fetch(`https://localhost:7245/Clientes/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdCliente").value = data.id;
        document.getElementById("NombreEditar").value = data.nombreCliente;
        document.getElementById("ApellidoEditar").value = data.apellidoCliente;
        document.getElementById("DniEditar").value = data.dni;
        document.getElementById("SaldoEditar").value = data.saldo;
        $("#error").empty();
            $("#error").attr("hidden", true);

        $('#modalEditarClientes').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}



function EditarCliente() {
    let IdCliente = document.getElementById("IdCliente").value;

    var nombreCliente = document.getElementById("NombreEditar").value;
    if (nombreCliente == "" || nombreCliente == null) {
        return mensajesError('#errorEditar', null, "Por favor ingrese un Nombre.");
    }
    if (nombreCliente.length < 3 || nombreCliente.length > 100) {
        return mensajesError('#errorEditar', null, "El Nombre debe contener entre 3 y 100 caracteres.");
    }

    var apellidoCliente = document.getElementById("ApellidoEditar").value;
    if( apellidoCliente  == ""  ||  apellidoCliente == null) {
        return mensajesError('#errorEditar', null, "Por favor ingrese un apellido para el cliente.")
    }

    var dni = document.getElementById("DniEditar").value;
    if( dni  == ""  ||  dni == null || parseInt(dni) <0)   {
        return mensajesError('#errorEditar', null, "Por favor ingrese un Dni para el cliente.")
    }

    var saldo = document.getElementById("SaldoEditar").value;
    if( saldo  == ""  ||  saldo == null) {
        return mensajesError('#errorEditar', null, "Por favor ingrese un saldo para el cliente.")
    }




    let editarCliente = {
        id: IdCliente,
        nombreCliente: document.getElementById("NombreEditar").value,
        apellidoCliente: document.getElementById("ApellidoEditar").value,
        dni: document.getElementById("DniEditar").value,
        saldo: document.getElementById("SaldoEditar").value
    }

    fetch(`https://localhost:7245/Clientes/${IdCliente}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarCliente)
    })
    .then(data => {
    
            document.getElementById("IdCliente").value = 0;
            document.getElementById("NombreEditar").value = "";
            document.getElementById("ApellidoEditar").value = "";
            document.getElementById("DniEditar").value = 0;
            document.getElementById("SaldoEditar").value = 0;
            $("#errorEditar").empty();
            $("#errorEditar").attr("hidden", true);
            $('#modalEditarClientes').modal('hide');
           

            ObtenerClientes();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))

}
function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function(cliente, item) {
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




