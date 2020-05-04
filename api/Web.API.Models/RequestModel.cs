using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models
{
    public class RequestModel
    {
        public int CourseId { get; set; }
        public int LessonId { get; set; }
        public DateTime Date { get; set; }
    }
}
