using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Web.API.Controllers
{
    public class AuthOptions
    {
        public const string ISSUER = "WebApiAuthServer";
        public const string AUDIENCE = "http://localhost:51884/";
        private const string KEY = "55629A59-F2C6-4793-9D16-26666063450F";
        public const int LIFETIME = 60 * 24 * 60;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}