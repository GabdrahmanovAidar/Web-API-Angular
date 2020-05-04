using DAL;
using Interfaces;
using Interfaces.Contexts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Course
{
    public class CourseCreateCommand : ICommand<CourseCreateContext>
    {
        private readonly EfContext _db;

        public CourseCreateCommand(EfContext db)
        {
            _db = db;
        }

        public async Task<CommandResult> ExecuteAsync(CourseCreateContext context)
        {

            context.Course.CreatedDate = DateTime.UtcNow;
            context.Course.Status = DAL.Entities.Course.Statuses.Active;

            using (var transaction = await _db.Database.BeginTransactionAsync())
            {

                _db.Courses.Add(context.Course);
                await _db.SaveChangesAsync();

                transaction.Commit();
            }
            return CommandResult.Success();
        }
    }
}
