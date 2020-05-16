using Microsoft.EntityFrameworkCore;
using DAL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.EntitiesConfigurations
{
    public class VideoEntitiesConfiguration : IEntityTypeConfiguration<VideosItem>
    {
        public void Configure(EntityTypeBuilder<VideosItem> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).HasMaxLength(200).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(1000).IsRequired();
            builder.Property(x => x.Status).IsRequired();
        }
    }
}