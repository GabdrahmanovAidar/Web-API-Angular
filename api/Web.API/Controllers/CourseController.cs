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
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(CourseModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(int id, int time_offset = 0)
        {
            var course = await _courseQueries.GetById(id);

            if (course == null)
            {
                return BadRequest(new ApiResultCode("COURSE_NOT_FOUND", "Курс не найден"));
            }
            course.SetOffset(time_offset);
            return Ok(course);
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(List<CourseModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetList(int page = 1, int size = 1000, int time_offset = 0, string status = null)
        {
            var result = await _courseQueries.GetList(new CourseFilter
            {
                Page = page,
                Size = size,
                Status = status
            });
            result.List.ForEach(x => x.SetOffset(time_offset));
            return Ok(result);
        }

        [HttpPost("")]
        [ProducesResponseType(typeof(CourseModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] CourseModel model, int time_offset = 0)
        {
            var course = GetCourse(model);
            var covers = GetUploads(model.Covers);
            // В этом месте происходит передача контекста в BL Commands
            var commandResult = await _commandHandler.Execute(new CourseCreateContext
            {
                Course = course,
                Covers = covers
            });

            if (commandResult.IsSuccess)
            {
                var newsModel = await _courseQueries.GetById(course.Id);
                model.SetOffset(time_offset);
                return Ok(newsModel);
            }
            else
            {
                return BadRequest(new ApiResultCode(commandResult));
            }

        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(CourseModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] CourseModel model, int time_offset = 0)
        {
            model.SetOffset((-1) * time_offset);

            //var validationResult = _validatorFactory.GetValidator<NewsModel>().Validate(model);
            //if (!validationResult.IsValid)
            //{
            //    return BadRequest(new ApiResultCode(validationResult));
            //}
            var covers = GetUploads(model.Covers);
            var course = GetCourse(model);

            var commandResult = await _commandHandler.Execute(new CourseUpdateContext
            {
                Course = course,
                Covers = covers,
                Id = id
            });

            if (commandResult.IsSuccess)
            {
                var newsModel = await _courseQueries.GetById(id);
                newsModel.SetOffset(time_offset);
                return Ok(course);
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
            var result = await _commandHandler.Execute(new CourseDeleteContext
            {
                Id = id
            });
            return result.IsSuccess ? (IActionResult)Ok() : BadRequest(new ApiResultCode(result));
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

        private List<Upload> GetUploads(IEnumerable<PhotoUploadModel> model)
        {
            return model.Select(x => new Upload { Id = x.Id }).ToList();
        }
    }
}