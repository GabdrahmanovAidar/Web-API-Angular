namespace Web.API.Models
{
    public class UsersFilter : FilterBase
    {
        public string Search { get; set; }
        public string Status { get; set; }
        public string UserName { get; set; }
        public string Type { get; set; }
    }
}