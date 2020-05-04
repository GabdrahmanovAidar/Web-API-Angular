using DAL;
using DAL.Entities;
using Interfaces.Queries;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Models;

namespace Web.API.Queries
{
    public class LessonQueries : ILessonQueries
    {
        private readonly EfContext _db;

        public LessonQueries (EfContext db)
        {
            _db = db;
        }
        public async Task<LessonModel> GetById(int id)
        {
            var query = _db.Lessons.AsQueryable().Where(x => x.Id == id);

            return await MapQuery(query).FirstOrDefaultAsync();

        }

        public async Task<LessonModel> GetLessonByCourseId(int courseId)
        {
            var query = _db.Lessons.AsQueryable().Where(x => x.CourseId == courseId);

            return await MapQuery(query).FirstOrDefaultAsync();
        }


        public async Task<PageResultModel<LessonModel>> GetList(LessonFilter filter)
        {
            var query = _db.Lessons.AsQueryable();

            if (filter.CourseId != 0)
            {
                query = query.OrderBy(x => x.CourseId)
               .Skip((filter.Page - 1) * filter.Size)
               .Take(filter.Size);

                var count = await query.CountAsync();

                var list = await MapQuery(query).ToListAsync();

                return new PageResultModel<LessonModel>
                {
                    Size = filter.Size,
                    Page = filter.Page,
                    TotalCount = count,
                    List = list
                };        
            }
            if (filter.Duration != null)
            {

            }
            query = query.OrderByDescending(x => x.Id)
                .Skip((filter.Page - 1) * filter.Size)
               .Take(filter.Size);

            var count1 = await query.CountAsync();

            var list1 = await MapQuery(query).ToListAsync();

            return new PageResultModel<LessonModel>
            {
                Size = filter.Size,
                Page = filter.Page,
                TotalCount = count1,
                List = list1
            };

        }
        private IQueryable<LessonModel> MapQuery(IQueryable<Lesson> query)
        {
            return query.Select(x => new LessonModel
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Duration = x.Duration,
                CourseId = x.CourseId
            });;
        }
    }
}
