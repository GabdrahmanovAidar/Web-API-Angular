using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces.Contexts
{
    public class CourseUpdateContext : IContext
    {
        public int Id { get; set; }
        public Course Course { get; set; }
        public List<Upload> Covers { get; set; }
    }
}
