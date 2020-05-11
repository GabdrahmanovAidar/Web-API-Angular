using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models
{
    public class LessonFilter : FilterBase
    {
        public int CourseId { get; set; }
        public string Duration { get; set; }
        public string Status { get; set; }

    }
}
