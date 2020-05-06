using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models
{
    public class CourseFilter : FilterBase
    {
        public string Status { get; set; }
        public string Name { get; set; }
        public string Level { get; set; }
    }
}
