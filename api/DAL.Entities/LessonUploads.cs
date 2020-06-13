using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class LessonUploads
    {
        public int Id { get; set; }
        public string VideoUploadId { get; set; }
        public int LessonId { get; set; }
    }
}
