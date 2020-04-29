using DAL.Entities;
using DAL.EntitiesConfigurations;
using Microsoft.EntityFrameworkCore;
using System;

namespace DAL
{
    public class EfContext : DbContext
    {
        public EfContext(DbContextOptions<EfContext> options)
            : base(options)
        {
        }

        public DbSet<Upload> Uploads { get; set; }
        public DbSet<Entities.Login> Logins { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<QuestRecomendation> QuestRecomendations { get; set; }
        public DbSet<ProductHelper> ProductHelpers { get; set; }
        public DbSet<VideosUpload> VideosUpload { get; set; }
        public DbSet<Course> Courses { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UploadEntityConfiguration());
            modelBuilder.ApplyConfiguration(new UserEntityConfiguration());
            modelBuilder.ApplyConfiguration(new CourseEntityConfiguration());
        }
    }
}