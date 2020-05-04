using System;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Web.API.Extensions
{
    public static class HttpContextExtension
    {
        public static int GetUserId(this HttpContext context)
        {
            var id = context.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            return !string.IsNullOrEmpty(id) ? Convert.ToInt32(id) : 0;
        }
    }
}