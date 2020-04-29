using System.Threading.Tasks;
using DAL;
using Interfaces;
using Interfaces.Specs;
using Microsoft.EntityFrameworkCore;

namespace BL.Commands.Users.Specs
{
    public class UserSpecs : IUserSpecs
    {
        private readonly EfContext _db;

        public UserSpecs(EfContext db)
        {
            _db = db;
        }

        public async Task<SpecResult> IsUserCodeCorrect(CleanPhone phone, string code)
        {
            return SpecResult.No("INVALID_CODE", "Код неверен");
        }

        public async Task<SpecResult> IsUserPhoneUnique(CleanPhone phone)
        {
            
            if (await _db.Users.AnyAsync(x => x.Phone == phone.Clean))
            {
                return SpecResult.No("PHONE_NOT_UNIQUE", "Номер пользователя не уникален");
            }

            return SpecResult.Yes();
        }
     
        public async Task<SpecResult> IsUserEmailUnique(string email)
        {
            if (await _db.Users.AnyAsync(x => x.Email == email))
            {
                return SpecResult.No("EMAIL_NOT_UNIQUE", "Email пользователя не уникален");
            }

            return SpecResult.Yes();
        }
    }
}
