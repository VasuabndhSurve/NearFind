namespace NearFind.API.Models;

public class Vendor
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    public decimal Rating { get; set; }

    public int ReviewCount { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public int CategoryId { get; set; }

    public Category? Category { get; set; }
}