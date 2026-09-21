using Microsoft.EntityFrameworkCore;
using NearFind.API.Models;

namespace NearFind.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Vendor> Vendors => Set<Vendor>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>()
            .HasMany(category => category.Vendors)
            .WithOne(vendor => vendor.Category)
            .HasForeignKey(vendor => vendor.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Vendor>()
            .Property(vendor => vendor.Rating)
            .HasPrecision(2, 1);

        // Seed Categories
        modelBuilder.Entity<Category>().HasData(
            new Category
            {
                Id = 1,
                Name = "Beauty",
                Description = "Salons, spas and personal wellness services"
            },
            new Category
            {
                Id = 2,
                Name = "Healthcare",
                Description = "Clinics, doctors and healthcare services"
            },
            new Category
            {
                Id = 3,
                Name = "Fitness",
                Description = "Gyms, yoga studios and fitness centers"
            },
            new Category
            {
                Id = 4,
                Name = "Fashion",
                Description = "Boutiques, clothing and fashion services"
            },
            new Category
            {
                Id = 5,
                Name = "Food",
                Description = "Restaurants, cafes and food services"
            }
        );

        // Seed Vendors
        modelBuilder.Entity<Vendor>().HasData(
            new Vendor
            {
                Id = 1,
                Name = "Glow Beauty Studio",
                Description = "Professional beauty and wellness services with experienced stylists.",
                Address = "Andheri West",
                City = "Mumbai",
                Phone = "9876543210",
                ImageUrl = "",
                Rating = 4.8m,
                ReviewCount = 124,
                Latitude = 19.1364,
                Longitude = 72.8296,
                CategoryId = 1
            },

            new Vendor
            {
                Id = 2,
                Name = "Style Studio",
                Description = "Beauty studio offering styling and personal care services.",
                Address = "Thane West",
                City = "Thane",
                Phone = "9876543211",
                ImageUrl = "",
                Rating = 4.5m,
                ReviewCount = 87,
                Latitude = 19.2183,
                Longitude = 72.9781,
                CategoryId = 1
            },

            new Vendor
            {
                Id = 3,
                Name = "MediCare Clinic",
                Description = "A trusted clinic providing quality healthcare and diagnostic services.",
                Address = "Powai",
                City = "Mumbai",
                Phone = "9876543212",
                ImageUrl = "",
                Rating = 4.9m,
                ReviewCount = 156,
                Latitude = 19.1176,
                Longitude = 72.9060,
                CategoryId = 2
            },

            new Vendor
            {
                Id = 4,
                Name = "FitZone Fitness",
                Description = "Modern fitness center offering training, yoga and wellness programs.",
                Address = "Bandra West",
                City = "Mumbai",
                Phone = "9876543213",
                ImageUrl = "",
                Rating = 4.6m,
                ReviewCount = 98,
                Latitude = 19.0607,
                Longitude = 72.8362,
                CategoryId = 3
            },

            new Vendor
            {
                Id = 5,
                Name = "Urban Threads",
                Description = "Contemporary fashion and styling for everyday and special occasions.",
                Address = "Lower Parel",
                City = "Mumbai",
                Phone = "9876543214",
                ImageUrl = "",
                Rating = 4.4m,
                ReviewCount = 76,
                Latitude = 18.9988,
                Longitude = 72.8258,
                CategoryId = 4
            },

            new Vendor
            {
                Id = 6,
                Name = "Mumbai Spice",
                Description = "A local restaurant serving authentic Indian dishes and regional flavors.",
                Address = "Dadar West",
                City = "Mumbai",
                Phone = "9876543215",
                ImageUrl = "",
                Rating = 4.7m,
                ReviewCount = 212,
                Latitude = 19.0178,
                Longitude = 72.8478,
                CategoryId = 5
            }
        );
    }
}