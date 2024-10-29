using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class Ventas
{
public int Id { get; set; }
    
    
 public DateTime FechaVenta { get; set;}

public bool? Finalizada {get; set;}

   public int IdCliente {get; set;}  

public virtual ICollection<DetalleVenta>? DetalleVentas { get; set; }
}