using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class VideosUpload
    {
        public int Id { get; set; }
        public string VideoUploadId { get; set; }
        public int VideoId { get; set; }
    }
}
