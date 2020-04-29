using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces;
using Interfaces.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Route("api/lesson")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ICommandHandler _commandHandler;
        private readonly ICourseQueries _usersQueries;
        public LessonController(ICourseQueries courseQueries, ICommandHandler commandHandler)
        {
            _commandHandler = commandHandler;
            _usersQueries = courseQueries;
        }


    }
}