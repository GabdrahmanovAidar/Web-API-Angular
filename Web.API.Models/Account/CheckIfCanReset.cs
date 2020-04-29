using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models.Account
{
    public class CheckIfCanReset
    {
        public int UserId { get; set; }
        public string Code { get; set; }
    }
}
