using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using Interfaces;
using Interfaces.Contexts;
using Interfaces.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.API.Models;

namespace Web.API.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICommandHandler _commandHandler;
        private readonly ICourseQueries _courseQueries;
        public CourseController(ICourseQueries courseQueries, ICommandHandler commandHandler)
        {
            _commandHandler = commandHandler;
            _courseQueries = courseQueries;
        }

        [HttpPost("")]
        [ProducesResponseType(typeof(CourseModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] CourseModel model, int time_offset = 0)
        {
            var course = GetCourse(model);

            // В этом месте происходит передача контекста в BL Commands
            var commandResult = await _commandHandler.Execute(new CourseCreateContext
            {
                Course = course
            });

            return Ok();

        }

        private Course GetCourse(CourseModel x)
        {
            return new Course
            {
                Description = x.Description,
                Level = x.Level,
                CourseDuration = x.CourseDuration,
                Name = x.Name,
                CreatedDate = DateTime.Now,
                Status = Course.Statuses.Active
            };

        }






    }
}