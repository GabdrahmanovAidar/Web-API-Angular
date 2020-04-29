using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Interfaces;
using Interfaces.Contexts;
using Interfaces.Specs;
using Microsoft.EntityFrameworkCore;

namespace BL.Commands.Users
{
    class UserUpdateCommand : ICommand<UserUpdateContext>
    {
        private readonly EfContext _db;
        private readonly IPhoneCleaner _phoneCleaner;
        private readonly IUserSpecs _userSpecs;

        public UserUpdateCommand(EfContext db, IPhoneCleaner phoneCleaner, IUserSpecs userSpecs)
        {
            _db = db;
            _phoneCleaner = phoneCleaner;
            _userSpecs = userSpecs;
        }

        public async Task<CommandResult> ExecuteAsync(UserUpdateContext context)
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == context.Id);
            var login = await _db.Logins.FirstOrDefaultAsync(x => x.Id == user.LoginId);

            var cleanPhone = _phoneCleaner.Clean(context.User.Phone);
            context.User.Phone = cleanPhone.Clean;

            if (user == null) return CommandResult.Fail("USER_NOT_FOUND", "Пользователь не найден");

            if (!DAL.Entities.User.Statuses.Available.Contains(context.User.Status))
                return CommandResult.Fail("STATUS_NOT_CORRECT", "Неверный статус");

            var uniqueEmail = await _userSpecs.IsUserEmailUnique(context.User.UserName);
            if (!uniqueEmail) return CommandResult.FromSpec(uniqueEmail);

            var model = context.User;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PatronymicName = model.PatronymicName;
            user.Status = model.Status;
            user.BirthDate = model.BirthDate;
            user.Phone = model.Phone;
            user.PhotoUploadId = model.PhotoUploadId;
            login.Type = context.Type;
            await _db.SaveChangesAsync();

            return CommandResult.Success();

        }
    }
}