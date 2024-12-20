using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using menyala.Models;

namespace Menyala.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }
      

        // DbSets untuk tabel dalam database
        public DbSet<Test> Tests { get; set; }
        public DbSet<Phone> Phones { get; set; }
        public DbSet<Pengguna> Pengguna { get; set; }
        public DbSet<Tiket> Tikets { get; set; }
        public DbSet<Pic> pic { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
        // Konfigurasi untuk entitas Tiket
        modelBuilder.Entity<Tiket>().Property(t => t.CreatedAt)
            .HasConversion(
                v => v.ToUniversalTime(), // Convert to UTC when saving
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc) // Convert to UTC when reading
            );

        // Konfigurasi untuk entitas Pengguna
        modelBuilder.Entity<Pengguna>().ToTable("Pengguna"); // Sesuaikan nama tabel di sini jika berbeda

        // Panggil base untuk menyertakan konfigurasi default jika ada
        base.OnModelCreating(modelBuilder);
    }

    }
}