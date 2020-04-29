using Microsoft.Extensions.Configuration;

namespace Web.API.Configs
{
    public static class ConfigurationExtensions
    {
        public static AdminConfig GetSystemAdmin(this IConfiguration config)
        {
            return config.GetSection("AdminConfig").Get<AdminConfig>();
        }
    }
}
