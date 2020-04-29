using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces.Contexts
{
    public class CourseCreateContext : IContext
    {
        public Course Course { get; set; }
    }
}
