using Microsoft.EntityFrameworkCore;
using TSCD.Data.Entities;

namespace TSCD.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : 
        base(options) {}
    
    public DbSet<Collection> Collections => Set<Collection>();
    public DbSet<Sample> Samples => Set<Sample>();
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}