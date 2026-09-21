using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NearFind.API.Data;

namespace NearFind.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Categories
            .AsNoTracking()
            .OrderBy(category => category.Name)
            .Select(category => new
            {
                category.Id,
                category.Name,
                category.Description
            })
            .ToListAsync();

        return Ok(categories);
    }
}