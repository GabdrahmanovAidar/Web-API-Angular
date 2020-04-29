using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Interfaces;
using Interfaces.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BL.Commands.Users
{
    class UserDeleteCommand : ICommand<UserDeleteContext>
    {
        private readonly EfContext _db;

        public UserDeleteCommand(EfContext db)
        {
            _db = db;
        }

        public async Task<CommandResult> ExecuteAsync(UserDeleteContext context)
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == context.Id);
            if (user == null) return CommandResult.Fail("USER_NOT_FOUND", "Пользователь не найден");
            user.Status = DAL.Entities.User.Statuses.Deleted;
            await _db.SaveChangesAsync();
            return CommandResult.Success();

        }
    }
}