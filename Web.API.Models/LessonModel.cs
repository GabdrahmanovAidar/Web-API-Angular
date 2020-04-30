using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models
{
    public class LessonModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public int CourseId { get; set; }
    }
}
