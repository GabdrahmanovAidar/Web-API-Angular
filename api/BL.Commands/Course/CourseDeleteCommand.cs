using DAL;
using Interfaces;
using Interfaces.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Course
{
    public class CourseDeleteCommand : ICommand<CourseDeleteContext>
    {
        private readonly EfContext _db;

        public CourseDeleteCommand(EfContext db) => _db = db;

        public async Task<CommandResult> ExecuteAsync(CourseDeleteContext context)
        {
            var course = await _db.Courses.FirstOrDefaultAsync(x => x.Id == context.Id);
            if (course == null) return CommandResult.Fail("COURSE_NOT_FOUND", "Курс не найден");
            course.Status = DAL.Entities.Course.Statuses.Deleted;
            await _db.SaveChangesAsync();
            return CommandResult.Success();

        }
    }
}
