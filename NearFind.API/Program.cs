
using Microsoft.EntityFrameworkCore;
using NearFind.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Database connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Register controllers
builder.Services.AddControllers();

// OpenAPI
builder.Services.AddOpenApi();

// Build application (ONLY ONCE)
var app = builder.Build();

// Enable CORS
app.UseCors("AllowReact");

// Configure HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// HTTPS redirection disabled for local HTTP testing
// app.UseHttpsRedirection();

app.UseAuthorization();

// Map API controllers
app.MapControllers();

app.Run();