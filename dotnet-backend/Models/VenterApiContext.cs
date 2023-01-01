using Microsoft.EntityFrameworkCore;

namespace VenterApi.Models
{
    public class VenterApiContext : DbContext
    {
        public VenterApiContext(DbContextOptions<VenterApiContext> options)
            : base(options)
        {
        }

        public DbSet<Conflict> Conflicts { get; set; }
    }
}