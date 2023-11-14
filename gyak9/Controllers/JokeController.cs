using gyak9.JokeModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace gyak9.Controllers
{
    [Route("api/jokes")]
    [ApiController]
    public class JokeController : ControllerBase
    {
        // GET: api/jokes
        [HttpGet]
        public IActionResult Get()
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            return Ok(context.Jokes.ToList());
        }

        // GET api/jokes/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var searching = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            if (searching == null)
                return NotFound($"Nincs #{id} azonosítóval vicc");
            else
                return Ok(searching);
        }

        // POST api/jokes
        [HttpPost]
        public void Post([FromBody] Joke newJoke)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            context.Jokes.Add(newJoke);
            context.SaveChanges();
        }

        // DELETE api/jokes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var jokeToBeDeleted = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            context.Remove(jokeToBeDeleted);
            context.SaveChanges();
        }
    }
}
