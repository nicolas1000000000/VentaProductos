function ObtenerProductos() {
    fetch('https://localhost:7245/Productos')
        .then(response => response.json())
        .then(data => MostrarProductos(data))
        .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarProductos(data) {
    let tbody = document.getElementById('todosLosProductos');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdId = document.createTextNode(element.id);
        td0.appendChild(tdId);

        let td1 = tr.insertCell(1);
        let tdName = document.createTextNode(element.nombreProducto);
        td1.appendChild(tdName);

        let td2 = tr.insertCell(2);
        let tdCantidad = document.createTextNode(element.cantidad);
        td2.appendChild(tdCantidad);

        let td3 = tr.insertCell(3);
        let tdPrecioVenta = document.createTextNode(element.precioVenta);
        td3.appendChild(tdPrecioVenta);

        let td4 = tr.insertCell(4);
        let tdPrecioCompra = document.createTextNode(element.precioCompra);
        td4.appendChild(tdPrecioCompra);

        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarProductoId(${element.id})`);
        let td5 = tr.insertCell(5);
        td5.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarProducto(${element.id})`);
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

function CrearProducto() {

    var nombreProd = document.getElementById("Nombre").value;
    if (nombreProd == "" || nombreProd == null) {
        return mensajesError('#error', null, "Por favor ingrese un Nombre.");
    }

    var cantidad = document.getElementById("Cantidad").value;
    if (cantidad == "" || cantidad == null || parseInt(cantidad) < 0) {
        return mensajesError('#error', null, "Por favor ingrese una Cantidad.");
    }

    var precioVenta = document.getElementById("PrecioVenta").value;
    if (precioVenta == "" || precioVenta == null || parseFloat(precioVenta) < 0) {
        return mensajesError('#error', null, "Por favor ingrese un Precio de Venta.");
    }

    var precioCompra = document.getElementById("PrecioCompra").value;
    if (precioCompra == "" || precioCompra == null || parseFloat(precioCompra) < 0) {
        return mensajesError('#error', null, "Por favor ingrese un Precio de Compra.");
    }

    let producto = {
        nombreProducto: nombreProd,
        cantidad: parseInt(cantidad),
        precioVenta: parseFloat(precioVenta),
        precioCompra: parseFloat(precioCompra)
    };

    fetch('https://localhost:7245/Productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == undefined) {
                document.getElementById("Nombre").value = "";
                document.getElementById("Cantidad").value = "";
                document.getElementById("PrecioVenta").value = "";
                document.getElementById("PrecioCompra").value = "";


                $('#error').empty();
                $('#error').attr("hidden", true);
                $('#modalAgregarProductos').modal('hide');
                ObtenerProductos();
            } else {
                mensajesError('#error', data);
            }
        })
        .catch(error => console.log("Hubo un error al guardar el Producto nuevo, verifique el mensaje de error: ", error));
}

function EliminarProducto(id) {
    var siElimina = confirm("¿Esta seguro de borrar este producto?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Productos/${id}`,
        {
            method: "DELETE"
        })
        .then(() => {
            ObtenerProductos();
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}

function BuscarProductoId(id) {
    fetch(`https://localhost:7245/Productos/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("IdProducto").value = data.id;
            document.getElementById("NombreEditar").value = data.nombreProducto;
            document.getElementById("CantidadEditar").value = data.cantidad;
            document.getElementById("PrecioVentaEditar").value = data.precioVenta;
            document.getElementById("PrecioCompraEditar").value = data.precioCompra;

            $('#modalEditarProductos').modal('show');
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}

function EditarProducto() {
    let idProducto = document.getElementById("IdProducto").value;

    var nombreProd = document.getElementById("NombreEditar").value;
    if (nombreProd == "" || nombreProd == null ||
        nombreProd.length < 3 || nombreProd.length > 100) {
        return mensajesError('#errorEditar', null, "Por favor ingrese un Nombre que contenga entre 3 y 100 caracteres.");
    }

    var cantidad = document.getElementById("CantidadEditar").value;
    if (cantidad == "" || cantidad == null || parseInt(cantidad) <0) {
        return mensajesError('#errorEditar', null, "Por favor ingrese una Cantidad para el Producto.");
    }

    var precioVenta = document.getElementById("PrecioVentaEditar").value;
    if (precioVenta == "" || precioVenta == null || parseFloat(precioVenta) < 0) {
        return mensajesError('#errorEditar', null, "Por favor ingrese un Precio de Venta para el Producto.");
    }

    var precioCompra = document.getElementById("PrecioCompraEditar").value;
    if (precioCompra == "" || precioCompra == null || parseFloat(precioCompra) < 0) {
        return mensajesError('#errorEditar', null, "Por favor ingrese un Precio de Compra para el Producto.");
    }

    let editarProducto = {
        id: idProducto,
        nombreProducto: document.getElementById("NombreEditar").value,
        cantidad: document.getElementById("CantidadEditar").value,
        precioVenta: document.getElementById("PrecioVentaEditar").value,
        precioCompra: document.getElementById("PrecioCompraEditar").value
    }

    fetch(`https://localhost:7245/Productos/${idProducto}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarProducto)
    })
        .then(data => {
            document.getElementById("IdProducto").value = 0;
            document.getElementById("NombreEditar").value = "";
            document.getElementById("CantidadEditar").value = 0;
            document.getElementById("PrecioVentaEditar").value = 0;
            document.getElementById("PrecioCompraEditar").value = 0;

            $('#errorEditar').empty();
            $('#errorEditar').attr("hidden", true);
            $('#modalEditarProductos').modal('hide');
            ObtenerProductos();
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}

function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function (index, item) {
            $(id).append(
                "<ol>",
                "<li>" + item + "</li>",
                "</ol>"
            )
        })
    }
    else {
        $(id).append(
            "<ol>",
            "<li>" + mensaje + "</li>",
            "</ol>"
        )
    }

    $(id).attr("hidden", false);
}








