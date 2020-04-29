namespace Web.API.Models.Account
{
    public class ConfirmEmail
    {
        public int UserId { get; set; }
        public string Code { get; set; }
    }
}