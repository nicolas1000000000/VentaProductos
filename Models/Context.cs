using Microsoft.EntityFrameworkCore;



namespace VentaProductos.Models;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options)
        : base(options)
    {
    }

    public DbSet<Producto> Productos { get; set;} = null!;

    public DbSet<Cliente> Clientes { get; set; } = null!;

public DbSet<Ventas> Ventas { get; set; } = default!;


      public DbSet<DetalleVenta> DetalleVentas { get; set; } = null!;
}