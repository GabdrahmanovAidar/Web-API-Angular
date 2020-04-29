using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models
{
    public class VideoUploadModel : UploadModel
    {
        public double Duration { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
        public string ContentType { get; set; }
    }
}
