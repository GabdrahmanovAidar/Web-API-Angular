using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models.Account
{
    public class ConfirmEmailAgain
    {
        public int UserId { get; set; }
        public string Email { get; set; }
    }
}
