using DAL;
using Interfaces;
using Interfaces.Contexts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Request
{
    class RequestCreateCommand : ICommand<RequestCreateContext>
    {
        private readonly EfContext _db;

        public RequestCreateCommand(EfContext db)
        {
            _db = db;
        }
        public async Task<CommandResult> ExecuteAsync(RequestCreateContext context)
        {
            context.Request.Date = DateTime.UtcNow;
            using (var transaction = await _db.Database.BeginTransactionAsync())
            {

                _db.Requests.Add(context.Request);
                await _db.SaveChangesAsync();

                transaction.Commit();
            }
            return CommandResult.Success();
        }
    }
}
