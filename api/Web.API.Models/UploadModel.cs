namespace Web.API.Models
{
    public class UploadModel
    {
        public string Id { get; set; }
        public string Extension { get; set; }
        public string Source => $"https://415705.selcdn.ru/RANStudy/upload/{Id}{Extension}";
        public int? SizeInBytes { get; set; }
    }
}