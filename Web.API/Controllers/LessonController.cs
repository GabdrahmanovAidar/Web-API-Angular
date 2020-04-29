using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using Interfaces;
using Interfaces.Contexts;
using Interfaces.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.API.Models;

namespace Web.API.Controllers
{
    [Route("api/lesson")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ICommandHandler _commandHandler;
        private readonly ILessonQueries _lessonQueries;
        public LessonController(ILessonQueries lessonQueries, ICommandHandler commandHandler)
        {
            _commandHandler = commandHandler;
            _lessonQueries = lessonQueries;
        }

        [HttpPost("")]
        [ProducesResponseType(typeof(LessonModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] LessonModel model, int time_offset = 0)
        {
            var lesson = GetLesson(model);

            // В этом месте происходит передача контекста в BL Commands
            var commandResult = await _commandHandler.Execute(new LessonCreateContext
            {
                Lesson = lesson
            });

            return Ok();

        }

        private Lesson GetLesson(LessonModel lessonModel)
        {
            return new Lesson
            {
                Name = lessonModel.Name,
                Description = lessonModel.Description,
                Duration = lessonModel.Duration,
                CourseId = lessonModel.CourseId,
                CreatedDate = DateTime.UtcNow,
                Status = Lesson.Statuses.Active
            };
        }
    }
}