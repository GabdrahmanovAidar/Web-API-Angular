namespace Web.API.Models.Account
{
    public class ChangePassword
    {
        public int? UserId { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}