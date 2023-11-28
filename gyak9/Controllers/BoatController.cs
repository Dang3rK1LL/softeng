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

        [HttpGet]
        [Route("questions/{sorszám}")]
        public ActionResult M2(int rank)
        {
            HajoContext context = new HajoContext();
            var question = (from x in context.Questions
                          where x.QuestionId == rank
                          select x).FirstOrDefault();
            if (question == null) return BadRequest("Nincs ilyen sorszámú kérdés");
            return new JsonResult(question);
        }

        [HttpGet]
        [Route("questions/count")]
        public int M4()
        {
            HajoContext context = new HajoContext();
            int numberOfQuestions = context.Questions.Count();
            return numberOfQuestions;
        }
    }
}
