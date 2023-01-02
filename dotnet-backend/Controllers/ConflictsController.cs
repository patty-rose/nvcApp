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

    // GET: api/Conflicts?
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Conflict>>> Get(string userId)
    {
      var query = _db.Conflicts.AsQueryable();

      if (userId != null)
      {
        query = query.Where(entry => entry.UserId == userId);
      }

      else 
      {
        query = _db.Conflicts;
      }

      return await query.ToListAsync();
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


     // PUT: api/Conflicts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Conflict conflict)
    {
      if (id != conflict.ConflictId)
      {
        return BadRequest();
      }

      _db.Entry(conflict).State = EntityState.Modified;

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ConflictExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    private bool ConflictExists(int id)
    {
      return _db.Conflicts.Any(e => e.ConflictId == id);
    }

     // DELETE: api/Conflicts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteConflict(int id)
    {
      var conflict = await _db.Conflicts.FindAsync(id);
      if (conflict == null)
      {
        return NotFound();
      }

      _db.Conflicts.Remove(conflict);
      await _db.SaveChangesAsync();

      return NoContent();
    }


  }
}