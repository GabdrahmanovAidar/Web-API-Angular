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
            var videos = GetVideos(model.Videos);
            

            // В этом месте происходит передача контекста в BL Commands
            var commandResult = await _commandHandler.Execute(new LessonCreateContext
            {
                Lesson = lesson,
                Videos = videos
                
            });

            if (commandResult.IsSuccess)
            {
                var lessonModel = await _lessonQueries.GetById(lesson.Id);
                model.SetOffset(time_offset);
                return Ok(lessonModel);
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

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(LessonModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] LessonModel model, int time_offset = 0)
        {
            model.SetOffset((-1) * time_offset);

            //var validationResult = _validatorFactory.GetValidator<NewsModel>().Validate(model);
            //if (!validationResult.IsValid)
            //{
            //    return BadRequest(new ApiResultCode(validationResult));
            //}
           
            var lesson = GetLesson(model);
         
            var videos = GetVideos(model.Videos);

            var commandResult = await _commandHandler.Execute(new LessonUpdateContext
            {
                Lesson = lesson,
                Id = id,
                Videos = videos
            });

            if (commandResult.IsSuccess)
            {
                var newsModel = await _lessonQueries.GetById(id);
                newsModel.SetOffset(time_offset);
                return Ok(lesson);
            }
            else
            {
                return BadRequest(new ApiResultCode(commandResult));
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _commandHandler.Execute(new LessonDeleteContext
            {
                Id = id
            });
            return result.IsSuccess ? (IActionResult)Ok() : BadRequest(new ApiResultCode(result));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(LessonModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(int id, int time_offset = 0)
        {
            var lesson = await _lessonQueries.GetById(id);

            if (lesson == null)
            {
                return BadRequest(new ApiResultCode("COURSE_NOT_FOUND", "Курс не найден"));
            }
            lesson.SetOffset(time_offset);
            return Ok(lesson);
        }

        private List<Upload> GetVideos(IEnumerable<VideoUploadModel> model)
        {
            return model.Select(x => new Upload { Id = x.Id }).ToList();
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