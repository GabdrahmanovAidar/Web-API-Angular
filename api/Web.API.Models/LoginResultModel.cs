using Web.API.Models;

namespace Web.API.Models
{
    public class LoginResultModel
    {
        public string AccessToken { get; set; }
        public string Type { get; set; }
        public UserModel User { get; set; }
        
    }
}
