using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class CourseUpload
    {
        public int Id { get; set; }
        public string PhotoUploadId { get; set; }
        public int CourseId { get; set; }
    }
}
