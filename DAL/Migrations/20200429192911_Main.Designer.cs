﻿// <auto-generated />
using System;
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DAL.Migrations
{
    [DbContext(typeof(EfContext))]
    [Migration("20200429192911_Main")]
    partial class Main
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("DAL.Entities.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CourseDuration");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description")
                        .HasMaxLength(300);

                    b.Property<string>("Level");

                    b.Property<string>("Name")
                        .HasMaxLength(30);

                    b.Property<string>("Status");

                    b.HasKey("Id");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("DAL.Entities.Lesson", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CourseId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<string>("Duration");

                    b.Property<string>("Name");

                    b.Property<string>("Status");

                    b.HasKey("Id");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("DAL.Entities.Login", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Hash");

                    b.Property<string>("Status");

                    b.Property<string>("Type");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Logins");
                });

            modelBuilder.Entity("DAL.Entities.ProductHelper", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("PhotoUploadId");

                    b.Property<int>("RequestId");

                    b.HasKey("Id");

                    b.ToTable("ProductHelpers");
                });

            modelBuilder.Entity("DAL.Entities.QuestRecomendation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Inventory");

                    b.Property<string>("PhotoUploadId");

                    b.Property<int>("QuestId");

                    b.Property<string>("TimeSpend");

                    b.HasKey("Id");

                    b.ToTable("QuestRecomendations");
                });

            modelBuilder.Entity("DAL.Entities.Upload", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<int>("Bitrate");

                    b.Property<string>("ContentType");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<double>("Duration");

                    b.Property<string>("Extension");

                    b.Property<int>("Height");

                    b.Property<int>("SizeInBytes");

                    b.Property<string>("Type");

                    b.Property<int>("Width");

                    b.HasKey("Id");

                    b.ToTable("Uploads");
                });

            modelBuilder.Entity("DAL.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("BirthDate");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Email");

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName")
                        .HasMaxLength(100);

                    b.Property<string>("LastName")
                        .HasMaxLength(100);

                    b.Property<int?>("LoginId");

                    b.Property<string>("OperationsToken");

                    b.Property<string>("PatronymicName")
                        .HasMaxLength(100);

                    b.Property<string>("Phone")
                        .HasMaxLength(50);

                    b.Property<string>("PhotoUploadId")
                        .HasMaxLength(36);

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.HasIndex("LoginId");

                    b.HasIndex("PhotoUploadId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DAL.Entities.VideosUpload", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("VideoId");

                    b.Property<string>("VideoUploadId");

                    b.HasKey("Id");

                    b.ToTable("VideosUpload");
                });

            modelBuilder.Entity("DAL.Entities.User", b =>
                {
                    b.HasOne("DAL.Entities.Login")
                        .WithMany()
                        .HasForeignKey("LoginId");

                    b.HasOne("DAL.Entities.Upload")
                        .WithMany()
                        .HasForeignKey("PhotoUploadId");
                });
#pragma warning restore 612, 618
        }
    }
}
