using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class DetalleVenta
{
    public int Id { get; set; }

   
   public int IdProducto {get; set;}
    
    public int IdVenta { get; set; }

    public virtual Ventas? Ventas { get; set; }

    
    
}