
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NearFind.API.Data;
using NearFind.API.Models;

namespace NearFind.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VendorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public VendorsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/vendors
    [HttpGet]
    public async Task<IActionResult> GetVendors()
    {
        var vendors = await _context.Vendors
            .AsNoTracking()
            .Include(vendor => vendor.Category)
            .OrderByDescending(vendor => vendor.Rating)
            .Select(vendor => new
            {
                vendor.Id,
                vendor.Name,
                vendor.Description,
                vendor.Address,
                vendor.City,
                vendor.Phone,
                vendor.ImageUrl,
                vendor.Rating,
                vendor.ReviewCount,
                vendor.Latitude,
                vendor.Longitude,

                Category = vendor.Category == null
                    ? null
                    : new
                    {
                        vendor.Category.Id,
                        vendor.Category.Name
                    }
            })
            .ToListAsync();

        return Ok(vendors);
    }

    // GET: api/vendors/1
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetVendor(int id)
    {
        var vendor = await _context.Vendors
            .AsNoTracking()
            .Include(vendor => vendor.Category)
            .Where(vendor => vendor.Id == id)
            .Select(vendor => new
            {
                vendor.Id,
                vendor.Name,
                vendor.Description,
                vendor.Address,
                vendor.City,
                vendor.Phone,
                vendor.ImageUrl,
                vendor.Rating,
                vendor.ReviewCount,
                vendor.Latitude,
                vendor.Longitude,

                Category = vendor.Category == null
                    ? null
                    : new
                    {
                        vendor.Category.Id,
                        vendor.Category.Name
                    }
            })
            .FirstOrDefaultAsync();

        if (vendor == null)
        {
            return NotFound(new
            {
                message = "Vendor not found."
            });
        }

        return Ok(vendor);
    }

    // POST: api/vendors
    [HttpPost]
    public async Task<IActionResult> CreateVendor(Vendor vendor)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var categoryExists = await _context.Categories
            .AnyAsync(category => category.Id == vendor.CategoryId);

        if (!categoryExists)
        {
            return BadRequest(new
            {
                message = "Invalid CategoryId."
            });
        }

        vendor.Id = 0;

        _context.Vendors.Add(vendor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetVendor),
            new { id = vendor.Id },
            vendor);
    }

    // PUT: api/vendors/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateVendor(int id, Vendor updatedVendor)
    {
        if (id != updatedVendor.Id && updatedVendor.Id != 0)
        {
            return BadRequest(new
            {
                message = "Vendor ID mismatch."
            });
        }

        var existingVendor = await _context.Vendors
            .FindAsync(id);

        if (existingVendor == null)
        {
            return NotFound(new
            {
                message = "Vendor not found."
            });
        }

        var categoryExists = await _context.Categories
            .AnyAsync(category => category.Id == updatedVendor.CategoryId);

        if (!categoryExists)
        {
            return BadRequest(new
            {
                message = "Invalid CategoryId."
            });
        }

        existingVendor.Name = updatedVendor.Name;
        existingVendor.Description = updatedVendor.Description;
        existingVendor.Address = updatedVendor.Address;
        existingVendor.City = updatedVendor.City;
        existingVendor.Phone = updatedVendor.Phone;
        existingVendor.ImageUrl = updatedVendor.ImageUrl;
        existingVendor.Rating = updatedVendor.Rating;
        existingVendor.ReviewCount = updatedVendor.ReviewCount;
        existingVendor.Latitude = updatedVendor.Latitude;
        existingVendor.Longitude = updatedVendor.Longitude;
        existingVendor.CategoryId = updatedVendor.CategoryId;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Vendor updated successfully.",
            vendor = existingVendor
        });
    }

    // DELETE: api/vendors/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteVendor(int id)
    {
        var vendor = await _context.Vendors
            .FindAsync(id);

        if (vendor == null)
        {
            return NotFound(new
            {
                message = "Vendor not found."
            });
        }

        _context.Vendors.Remove(vendor);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Vendor deleted successfully."
        });
    }
}