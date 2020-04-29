using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class Request
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int LessonId { get; set; }
        public DateTime Date { get; set; }
    }
}
