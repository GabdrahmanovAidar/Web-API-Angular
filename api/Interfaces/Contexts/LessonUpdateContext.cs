using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces.Contexts
{
    public class LessonUpdateContext : IContext
    {
        public int Id { get; set; }
        public Lesson Lesson { get; set; }
        public List<Upload> Videos { get; set; }
    }
}

