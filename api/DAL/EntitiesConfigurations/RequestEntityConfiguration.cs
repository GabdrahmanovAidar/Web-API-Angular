using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.EntitiesConfigurations
{
    class RequestEntityConfiguration : IEntityTypeConfiguration<Request>
    {
        public void Configure(EntityTypeBuilder<Request> builder)
        {
            builder.HasKey(x => x.Id);
           // builder.HasKey(x => x.CourseId);
           // builder.HasKey(x => x.LessonId);
            builder.Property(x => x.Date);
        }
    }
}
