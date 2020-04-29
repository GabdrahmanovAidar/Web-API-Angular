using DAL;
using Interfaces;
using Interfaces.Contexts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Lesson
{
    public class LessonCreateCommand : ICommand<LessonCreateContext>
    {
        private readonly EfContext _db;

        public LessonCreateCommand(EfContext db)
        {
            _db = db;
        }


        public async Task<CommandResult> ExecuteAsync(LessonCreateContext context)
        {

            using (var transaction = await _db.Database.BeginTransactionAsync())
            {

                _db.Lessons.Add(context.Lesson);
                await _db.SaveChangesAsync();

                transaction.Commit();
            }
            return CommandResult.Success();
        }
    }
}
