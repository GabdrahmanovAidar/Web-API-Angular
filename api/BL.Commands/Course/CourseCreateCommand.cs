using DAL;
using Interfaces;
using Interfaces.Contexts;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Course
{
    public class CourseCreateCommand : CreateMediaBase, ICommand<CourseCreateContext>
    {
        private readonly EfContext _db;
        private IMemoryCache cache;

        public CourseCreateCommand(EfContext db, IMemoryCache memoryCache) : base(db)
        {
            _db = db;
            cache = memoryCache;
        }

        public async Task<CommandResult> ExecuteAsync(CourseCreateContext context)
        {

            context.Course.CreatedDate = DateTime.UtcNow;
            context.Course.Status = DAL.Entities.Course.Statuses.Active;

            using (var transaction = await _db.Database.BeginTransactionAsync())
            {

                _db.Courses.Add(context.Course);
                int n = _db.SaveChanges();
                if (n > 0)
                {
                    cache.Set(context.Course.Id, context.Course, new MemoryCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                }
                await _db.SaveChangesAsync();

                await CreateUploads(context.Covers, context.Course.Id);

                transaction.Commit();
            }
            return CommandResult.Success();
        }
    }
}
