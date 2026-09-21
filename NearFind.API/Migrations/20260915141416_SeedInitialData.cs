using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NearFind.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Salons, spas and personal wellness services", "Beauty" },
                    { 2, "Clinics, doctors and healthcare services", "Healthcare" },
                    { 3, "Gyms, yoga studios and fitness centers", "Fitness" },
                    { 4, "Boutiques, clothing and fashion services", "Fashion" },
                    { 5, "Restaurants, cafes and food services", "Food" }
                });

            migrationBuilder.InsertData(
                table: "Vendors",
                columns: new[] { "Id", "Address", "CategoryId", "City", "Description", "ImageUrl", "Latitude", "Longitude", "Name", "Phone", "Rating", "ReviewCount" },
                values: new object[,]
                {
                    { 1, "Andheri West", 1, "Mumbai", "Professional beauty and wellness services with experienced stylists.", "", 19.136399999999998, 72.829599999999999, "Glow Beauty Studio", "9876543210", 4.8m, 124 },
                    { 2, "Thane West", 1, "Thane", "Beauty studio offering styling and personal care services.", "", 19.218299999999999, 72.978099999999998, "Style Studio", "9876543211", 4.5m, 87 },
                    { 3, "Powai", 2, "Mumbai", "A trusted clinic providing quality healthcare and diagnostic services.", "", 19.117599999999999, 72.906000000000006, "MediCare Clinic", "9876543212", 4.9m, 156 },
                    { 4, "Bandra West", 3, "Mumbai", "Modern fitness center offering training, yoga and wellness programs.", "", 19.060700000000001, 72.836200000000005, "FitZone Fitness", "9876543213", 4.6m, 98 },
                    { 5, "Lower Parel", 4, "Mumbai", "Contemporary fashion and styling for everyday and special occasions.", "", 18.998799999999999, 72.825800000000001, "Urban Threads", "9876543214", 4.4m, 76 },
                    { 6, "Dadar West", 5, "Mumbai", "A local restaurant serving authentic Indian dishes and regional flavors.", "", 19.017800000000001, 72.847800000000007, "Mumbai Spice", "9876543215", 4.7m, 212 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Vendors",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Vendors",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Vendors",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Vendors",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Vendors",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Vendors",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
