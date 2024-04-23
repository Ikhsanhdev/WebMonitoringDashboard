using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using menyala.Models;

namespace dotnetIcon.Data
{
    public class AppDbContext : DbContext {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration) {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options) {
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }

        // public DbSet<Pgsql> Pgsqls { get; set; }
        public DbSet<Test> tests { get; set; }
    }
}
