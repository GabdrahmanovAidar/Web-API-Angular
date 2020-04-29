using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using Interfaces;
using Interfaces.Queries;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Web.API.Configs;
using Web.API;
using Web.API.Models;

namespace Web.API.Controllers
{
    [Route("api/tokens")]
    public class TokensController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IPhoneCleaner _phoneCleaner;
        private readonly EfContext _db;
        private readonly IPasswordHasher<Login> _passwordHasher;


        public TokensController(IConfiguration configuration,
            IPhoneCleaner phoneCleaner,
            EfContext db,
            IPasswordHasher<Login> passwordHasher
        )
        {
            _configuration = configuration;
            _phoneCleaner = phoneCleaner;
            _db = db;
            _passwordHasher = passwordHasher;
        }

        [ProducesResponseType(typeof(LoginResultModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        [HttpPost("")]
        public async Task<IActionResult> Token([FromBody] LoginModel model)
        {
            ClaimsIdentity identity = null;

            Login login = null;
            if (model.Type == DAL.Entities.Login.Types.User)
            {
                login = await _db.Logins.FirstOrDefaultAsync(x => x.UserName == model.Username);

                if (login == null)
                {
                    return BadRequest(new ApiResultCode("USER_NOT_REGISTERED", "Пользователь не зарегистрирован"));
                }

                if (login.Status == DAL.Entities.User.Statuses.Blocked)
                {
                    return BadRequest(new ApiResultCode("USER_BLOCKED", "Пользователь заблокирован"));
                }

                UpdateUserPassword(login, model.Password);
                //SetSmsCodeIsUser(smsCode);
                await _db.SaveChangesAsync();
            }
            //var user = await _db.Users.FirstOrDefaultAsync(x => x.LoginId == login.Id);

            login = await GetLogin(model.Username, model.Password);
            if (login == null)

            {
                return BadRequest(new ApiResultCode("USER_NOT_FOUND",
                    "Пользователь не зарегистрирован, либо код введен неверно", true));
            }

            identity = GetIdentity(login);
            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(new LoginResultModel
            {
                AccessToken = encodedJwt,
                Type = login.Type,
            });
        }

        private void UpdateUserPassword(Login user, string code)
        {
            user.Hash = _passwordHasher.HashPassword(user, code);
        }

        //private void SetSmsCodeIsUser(SmsCode code)
        //{
        //    if (code != null)
        //    {
        //        code.IsUsed = true;
        //    }
        //}

        private ClaimsIdentity GetIdentity(Login user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, DAL.Entities.Login.Types.User),
                new Claim(ClaimTypes.Role, user.Type),
                new Claim("UserId", user.Id.ToString())
            };
            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

        private async Task<Login> GetLogin(string username, string password)
        {
            var admin = _configuration.GetSystemAdmin();
            if (admin.Username == username && admin.Password == password)
            {
                return new Login
                {
                    Id = -1,
                    Type = DAL.Entities.Login.Types.SystemAdministrator,
                    UserName = admin.Username
                };
            }

            var login = await _db.Logins.FirstOrDefaultAsync(x => x.UserName == username);
            if (login == null)
                return null;

            var isSuccess = _passwordHasher.VerifyHashedPassword(login, login.Hash, password)
                            != PasswordVerificationResult.Failed;
            return isSuccess ? login : null;
        }
    }
}