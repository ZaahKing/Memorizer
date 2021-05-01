using Memorizer.Web.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Memorizer.Web.DataAccess
{
    public class AppDBContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .HasData(new List<Role>
                {
                    new Role { Id=1, Name="Admin"},
                    new Role { Id=2, Name="ContentManager"},
                    new Role { Id=3, Name="User"},
                });
        }
    }
}
