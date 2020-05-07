namespace Web.API.Models
{
    public class UploadModel
    {
        public string Id { get; set; }
        public string Extension { get; set; }
        public string Source => $"https://327517.selcdn.ru/darkxx/uploads/{Id}{Extension}";
        public int? SizeInBytes { get; set; }
    }
}