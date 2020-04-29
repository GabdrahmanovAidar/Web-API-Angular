using DAL;
using Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Interfaces.Contexts;
using Interfaces.Specs;

namespace BL.Commands.Users
{
    public class UserCreateCommand : ICommand<UserCreateContext>
    {
        private readonly EfContext _db;
        private readonly IPhoneCleaner _phoneCleaner;
        private readonly IUserSpecs _userSpecs;

        public UserCreateCommand(EfContext db,
            IPhoneCleaner phoneCleaner, IUserSpecs userSpecs)
        {
            _db = db;
            _phoneCleaner = phoneCleaner;
            _userSpecs = userSpecs;
        }

        public async Task<CommandResult> ExecuteAsync(UserCreateContext context)
        {
            context.User.CreatedDate = DateTime.UtcNow;
            context.User.Status = DAL.Entities.User.Statuses.Active;
            var cleanPhone = _phoneCleaner.Clean(context.User.Phone);
            context.User.Phone = cleanPhone.Clean;
            var uniqueSpec = await _userSpecs.IsUserPhoneUnique(cleanPhone);
            if (!uniqueSpec) return CommandResult.FromSpec(uniqueSpec);

            var uniqueEmail = await _userSpecs.IsUserEmailUnique(context.User.UserName);
            if (!uniqueEmail) return CommandResult.FromSpec(uniqueEmail);
            using (var transaction = await _db.Database.BeginTransactionAsync())
            {
                context.Login.UserName = context.Login.UserName;
                _db.Logins.Add(context.Login);
                await _db.SaveChangesAsync();
                context.User.LoginId = context.Login.Id;
                context.User.Email = context.User.UserName;
                _db.Users.Add(context.User);
                await _db.SaveChangesAsync();

                transaction.Commit();
            }

            return CommandResult.Success();

        }
    }
}