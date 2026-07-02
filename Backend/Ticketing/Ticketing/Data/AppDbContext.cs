using Microsoft.EntityFrameworkCore;
using Ticketing.Models;

namespace Ticketing.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Ticket> Tickets { get; set; }

    }
}
