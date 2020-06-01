using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.EntitiesConfigurations
{
    internal class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.FirstName).HasMaxLength(100);
            builder.Property(x => x.LastName).HasMaxLength(100);
            builder.Property(x => x.PatronymicName).HasMaxLength(100);
            builder.Property(x => x.Phone).HasMaxLength(50);
            builder.Property(x => x.Status).HasMaxLength(10).IsRequired();
            builder.Property(x => x.PhotoUploadId).HasMaxLength(36);

            builder.HasOne<Login>()
                .WithMany()
                .HasForeignKey(x => x.LoginId);
            builder.HasOne<Upload>()
                .WithMany()
                .HasForeignKey(x => x.PhotoUploadId).IsRequired(false);

            builder.HasQueryFilter(x => x.Status != User.Statuses.Deleted);
        }
    }
}