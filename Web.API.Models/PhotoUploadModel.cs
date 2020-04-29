namespace Web.API.Models
{
    public class PhotoUploadModel : UploadModel
    {
        public int? Width  { get; set; }
        public int? Height { get; set; }
    }
}