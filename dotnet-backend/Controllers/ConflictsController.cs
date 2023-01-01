using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VenterApi.Models;

namespace VenterApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ConflictsController : ControllerBase
  {
    private readonly VenterApiContext _db;

    public ConflictsController(VenterApiContext db)
    {
      _db = db;
    }

    // GET api/conflicts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Conflict>>> Get()
    {
      return await _db.Conflicts.ToListAsync();
    }

    // POST api/conflicts
    [HttpPost]
    public async Task<ActionResult<Conflict>> Post(Conflict conflict)
    {
      _db.Conflicts.Add(conflict);
      await _db.SaveChangesAsync();

      return CreatedAtAction(nameof(GetConflict), new { id = conflict.ConflictId }, conflict);
    }

    // GET: api/Conflicts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Conflict>> GetConflict(int id)
    {
        var conflict = await _db.Conflicts.FindAsync(id);

        if (conflict == null)
        {
            return NotFound();
        }

        return conflict;
    }


  }
}