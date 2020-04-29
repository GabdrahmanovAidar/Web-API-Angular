using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces;
using Microsoft.AspNetCore.Hosting;

namespace Web.API.Utils
{
    public class SmsSender : ISmsSender
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public SmsSender(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public Task<CommandResult> Send(string phone, string message)
        {
            return Task.FromResult(CommandResult.Success());
        }
    }
}