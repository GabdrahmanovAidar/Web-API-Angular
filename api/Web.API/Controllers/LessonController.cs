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

            if (commandResult.IsSuccess)
            {
                var newsModel = await _lessonQueries.GetById(lesson.Id);
                model.SetOffset(time_offset);
                return Ok(newsModel);
            }
            else
            {
                return BadRequest(new ApiResultCode(commandResult));
            }

        }

        [HttpGet("")]
        [ProducesResponseType(typeof(List<LessonModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetList(int page = 1, int size = 1000, int time_offset = 0, string status = null)
        {
            var result = await _lessonQueries.GetList(new LessonFilter
            {
                Page = page,
                Size = size,
                Status = status
            });
            result.List.ForEach(x => x.SetOffset(time_offset));
            return Ok(result);
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