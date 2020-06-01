using DAL;
using Interfaces;
using Interfaces.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Course
{
    public class CourseUpdateCommand : CreateMediaBase, ICommand<CourseUpdateContext>
    {
        private readonly EfContext _db;

        public CourseUpdateCommand(EfContext db) : base(db) => _db = db;

        public async Task<CommandResult> ExecuteAsync(CourseUpdateContext context)
        {
            var courses = await _db.Courses.FirstOrDefaultAsync(x => x.Id == context.Id);
            if (courses == null)
            {
                return CommandResult.Fail("NEWS_NOT_FOUND", "Курс не найден");
            }

            using (var transaction = await _db.Database.BeginTransactionAsync())
            {
                await DeleteCascade(context.Id);

                courses.Name = context.Course.Name;
                courses.Description = context.Course.Description;
                courses.Level = context.Course.Level;
                courses.CourseDuration = context.Course.CourseDuration;
                await _db.SaveChangesAsync();

                await DropMedia(context.Id);
                await CreateUploads(context.Covers, context.Id);

                transaction.Commit();

                return CommandResult.Success();
            }

        }

        private async Task DeleteCascade(int id)
        {
            var cascade = _db.CourseUploads.Where(x => x.CourseId == id).ToList();

            _db.CourseUploads.RemoveRange(cascade);
            await _db.SaveChangesAsync();
        }
    }
}
