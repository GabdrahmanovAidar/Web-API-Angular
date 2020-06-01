using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models
{
    public class VideoModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<VideoUploadModel> Videos { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Status { get; set; }

        public void SetOffset(int minutes)
        {
            CreatedDate = CreatedDate?.AddMinutes(minutes);
        }
    }
}
