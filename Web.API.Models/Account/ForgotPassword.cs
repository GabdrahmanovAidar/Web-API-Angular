namespace Web.API.Models.Account
{
    public class ForgotPassword
    {
        public int UserId { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
    }
}