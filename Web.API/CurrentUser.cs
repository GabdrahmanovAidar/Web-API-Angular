using DAL;
using DAL.Entities;
using Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Login = DAL.Entities.Login;

namespace Web.API.Queries
{
    // one object per scope
    public class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly EfContext _db;
        private Login _login;
        private readonly object _syncObject = new object();

        public CurrentUser(IHttpContextAccessor httpContextAccessor, EfContext db)
        {
            _httpContextAccessor = httpContextAccessor;
            _db = db;
        }

        public Login GetCurrent()
        {
            if (_login != null) return _login;

            lock (_syncObject)
            {
                if (_login == null)
                {
                    // ReSharper disable once PossibleMultipleWriteAccessInDoubleCheckLocking
                    _login = GetAuthUser();
                }
            }

            return _login;
        }

        public bool IsSystemAdministrator()
        {
            var user = GetCurrent();
            return user?.Type == Login.Types.SystemAdministrator;
        }

        public bool IsNotAuth()
        {
            return GetCurrent() == null;
        }

        public void SetCurrent(Login login)
        {
            _login = login;
        }

        private List<Login> AdminTemporaryUsers()
        {
            return new List<Login>()
            {
                new Login
                {
                    Id = -1,
                    UserName = "admin@Web.ru",
                    Type = Login.Types.SystemAdministrator
                }
            };
        }

        private Login GetAuthUser()
        {
            var userClaimsPrinciple = _httpContextAccessor.HttpContext?.User;

            var username = userClaimsPrinciple?.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            if (username == null)
            {
                return null;
            }

            var userType = userClaimsPrinciple.FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
            return userType == DAL.Entities.Login.Types.SystemAdministrator
                ? AdminTemporaryUsers().FirstOrDefault(x => x.UserName == username)
                : null;
        }




        public Login GetAuthUsr()
        {
            var userClaimsPrinciple = _httpContextAccessor.HttpContext?.User;

            var username = userClaimsPrinciple?.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            if (username == null)
            {
                return null;
            }


            var userType = userClaimsPrinciple.FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
            var login = _db.Logins.Where(x => x.UserName == username && x.Type == userType).FirstOrDefault();
            return login;
        }
    }
}