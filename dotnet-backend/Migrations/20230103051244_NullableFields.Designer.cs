﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VenterApi.Models;

#nullable disable

namespace dotnet_backend.Migrations
{
    [DbContext(typeof(VenterApiContext))]
    [Migration("20230103051244_NullableFields")]
    partial class NullableFields
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("VenterApi.Models.Conflict", b =>
                {
                    b.Property<int>("ConflictId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ApologyStatement")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ConflictDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Feeling")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Need")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NeedsStatement")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ConflictId");

                    b.ToTable("Conflicts");
                });
#pragma warning restore 612, 618
        }
    }
}
