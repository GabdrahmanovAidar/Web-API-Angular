using DAL;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces.Contexts
{
    public class UserUpdateContext:IContext
    {
        public User User { get; set; }
        public int Id { get; set; }
        public string Type { get; set; }
        
    }
}
