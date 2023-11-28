using gyak9.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gyak9.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public IActionResult ReturnAllQuestions()
        {
            HajoContext context = new HajoContext();
            var questions = from x in context.Questions select x.Question1;
            return Ok(questions);
        }
    }
}
