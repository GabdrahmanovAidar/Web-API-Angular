using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces.Contexts
{
    public class LessonCreateContext : IContext
    {
        public Lesson Lesson { get; set; }
    }
}
