using Interfaces;
using Interfaces.Queries;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Controllers
{
    [Route("api/request")]
    [ApiController]
    public class RequestController:Controller
    {
        private readonly ICommandHandler _commandHandler;
        private readonly IRequestQueries _requestQueries;
        public RequestController(IRequestQueries requestQueries, ICommandHandler commandHandler)
        {
            _commandHandler = commandHandler;
            _requestQueries = requestQueries;
        }

    }
}
