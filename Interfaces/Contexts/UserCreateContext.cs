using DAL;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces.Contexts
{
    public class UserCreateContext:IContext
    {
        public User User { get; set; }
        public string Password { get; set; }
        public bool SendSmsOnCreate { get; set; }
        public Login Login { get; set; }
        
    }
}
