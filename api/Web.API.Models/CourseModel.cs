using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models
{
    public class CourseModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CourseDuration { get; set; }
        public string Level { get; set; }
        public string Status { get; set; }
    }
}
